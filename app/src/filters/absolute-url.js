var app = require('../app.js');

app.filter('absoluteUrl', function (selfUrl) {
  return function (url) {
    return selfUrl + '/' + url;
  };
});