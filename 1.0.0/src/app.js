var inline = require('inline');
var version = inline(function (req) {
  return req('./package.json').version;
});

var app = angular.module('audiblehero', ['ui.router', 'ui.bootstrap', 'angular.filter']);

app.constant('version', version);
app.constant('_', _);

_(_).keys().each(function (key) {
  app.filter('_' + key, function () {
    return _[key];
  });
}).value();

module.exports = app;


