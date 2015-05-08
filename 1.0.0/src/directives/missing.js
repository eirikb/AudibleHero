var app = require('../app.js');

app.directive('missinglist', function () {
  return {
    scope: {
      books: '='
    },
    template: require('../tpl/directives/missing.html')
  }
});
