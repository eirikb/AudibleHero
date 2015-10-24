angular.module('audiblehero').filter('absoluteUrl', function (selfUrl) {
  return function (url) {
    return selfUrl + '/' + url;
  };
});