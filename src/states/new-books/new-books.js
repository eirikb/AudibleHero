angular.module('audiblehero').config(function ($stateProvider) {
  $stateProvider.state('app.newbooks', {
    url: "newbooks",
    template: require('./new-books.html'),
    controller: function ($scope, _, saveIgnored) {
      $scope.grouped = $scope.bySeries;
      $scope.ignore = function (event, books) {
        event.preventDefault();

        _.each(books, function (book) {
          book.ignored = true;
        });

        saveIgnored();
      };
    }
  });
});
