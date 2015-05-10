var inline = require('inline');
var version = inline(function (req) {
  return req('./package.json').version;
});

module.exports = angular.module('audiblehero', ['ui.router', 'ui.bootstrap']).
  constant('version', version);


