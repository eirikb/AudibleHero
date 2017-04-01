angular.module('audiblehero').filter('absoluteUrl', function () {
  return function (url) {
    return chrome.extension.getURL(url);
  };
});