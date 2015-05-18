
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var fm = require('front-matter');
var marked = require('marked');
var cssnext = require('cssnext');
var pkg = require('./package.json');

var dir = './posts';
var filenames = fs.readdirSync(dir);
var posts = filenames.map(function(filename) {
  var content = fs.readFileSync(path.join(dir, filename), 'utf8');
  var matter = fm(content);
  var post = _.assign(matter.attributes, {
    slug: filename.replace(/\.md/, ''),
    body: matter.body, 
    html: marked(matter.body)
  });
  return post;
});

var routes = filenames.map(function(filename) {
  return '/' + filename.replace(/\.md$/,'');
});
routes.unshift('/');
console.log(routes);

module.exports = {
  title: 'Writing',
  description: pkg.description,
  author: pkg.author,
  css: cssnext([
    '@import "basscss";',
    '@import "page";',
  ].join('\n'), {
    compress: true,
    features: {
      rem: false,
      pseudoElements: false,
      colorRgba: false,
      customProperties: {
        variables: {
          'h4': '1.125rem',
          'heading-font-weight': '500',
          'button-font-weight': '500',
          'bold-font-weight': '500',
          'button-font-size': 'var(--h5)',
          'container-width': '48em',
        }
      }
    }
  }),
  posts: posts,
  routes: routes,
  //baseUrl: '/',
  baseUrl: '/writing/',
};
