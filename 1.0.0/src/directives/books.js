var app = require('../app.js');

app.directive('booktable', function () {
  return {
    scope: {
      books: '=',
      filter: '='
    },
    template: require('../tpl/directives/books.html')
  }
});
