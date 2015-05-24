var app = require('../app.js');

app.directive('booktable', function () {
  return {
    scope: {
      books: '=',
      filter: '=',
      filteredBooks: '='
    },
    template: require('../tpl/directives/books.html'),
    controller: function ($scope, saveIgnored) {
      $scope.ignore = function (event, book) {
        event.preventDefault();

        book.ignored = !book.ignored;
        saveIgnored($scope.books);
      }
    }
  }
});
