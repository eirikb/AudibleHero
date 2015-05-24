var app = require('../app.js');

app.directive('booktable', function () {
  return {
    scope: {
      books: '=',
      filter: '=',
      filteredBooks: '='
    },
    template: require('../tpl/directives/books.html')
  }
});
