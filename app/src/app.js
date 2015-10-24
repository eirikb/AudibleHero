var inline = require('inline');
var version = inline(function (req) {
  return req('./package.json').version;
});
var _ = require('lodash');
var moment = require('moment');

var app = angular.module('audiblehero', ['ui.router', 'ui.bootstrap', 'angular.filter', 'smart-table']);

app.config(function ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
});

var selfUrl = _.initial(angular.element(document.currentScript).attr('src').split('/')).join('/');

app.constant('version', version);
app.constant('_', _);
app.constant('selfUrl', selfUrl);
app.constant('moment', moment);

_(_).keys().each(function (key) {
  app.filter('_' + key, function () {
    return _[key];
  });
}).value();
