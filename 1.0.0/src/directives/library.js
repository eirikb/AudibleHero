var app = require('../app.js');

app.directive('library', function () {
  return {
    scope: {
      books: '='
    },
    template: require('../tpl/directives/library.html')
  }
});
