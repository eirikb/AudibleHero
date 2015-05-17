var app = require('../app.js');

app.filter('chunk', function () {
  return _.memoize(_.chunk);
});