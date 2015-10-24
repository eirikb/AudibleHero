angular.module('audiblehero').directive('booktable', function () {
  return {
    scope: {
      books: '=',
      filter: '=',
      filteredBooks: '='
    },
    template: require('./books.html'),
    controller: function ($scope, saveIgnored) {
      $scope.ignore = function (event, book) {
        event.preventDefault();

        book.ignored = !book.ignored;
        saveIgnored();
      }
    }
  }
});
