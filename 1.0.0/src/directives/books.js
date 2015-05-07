var app = require('../app.js');

app.directive('booktable', function () {
  return {
    scope: {
      books: '='
    },
    template: require('../tpl/directives/books.html')
  }
});
