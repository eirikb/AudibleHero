angular.module('audiblehero').config(function ($stateProvider) {
  $stateProvider.state('app.allbooks', {
    url: "allbooks",
    template: require('./all-books.html'),
    controller: function ($scope, saveIgnored) {
      $scope.displayBooks = [].concat($scope.books);

      $scope.toggleIgnore = function (book) {
        book.ignored = !book.ignored;
        saveIgnored();
      };
    }
  });
});
