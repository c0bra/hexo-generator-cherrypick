var merge = require('utils-merge');

var config = hexo.config.cherry_pick = merge({
  posts: 2,
  path: 'cp'
}, hexo.config.cherry_pick);

hexo.extend.generator.register('cherrypick', require('./lib/generator'));