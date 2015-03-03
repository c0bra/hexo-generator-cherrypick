var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var ejs = require('ejs');
var moment = require('moment');

var pwd = __dirname;
var templatePath = path.join(pwd, 'snippets.ejs');

var helpers = {
  date: function (date) {
    return moment(date).format('MMMM Do YYYY');
  },

  date_iso: function (date) {
    if (date == null){
      return new Date().toISOString();
    }

    if (date instanceof Date || moment.isMoment(date)) {
      return date.toISOString();
    }

    return new Date(date).toISOString();
  }
};

module.exports = function(locals, render, callback) {
  var config = hexo.config;

  var posts = locals.posts.sort('date', -1).slice(0, config.cherry_pick.posts);

  var config = _.extend(locals, { posts: posts, config: config, theme: hexo.theme }, helpers);

  var template = fs.readFileSync(templatePath, 'utf8');

  hexo.route.set('cp/blah.html', ejs.render(template, config));

  callback();
};
