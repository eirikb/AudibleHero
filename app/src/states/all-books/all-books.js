angular.module('audiblehero').config(function ($stateProvider) {
  $stateProvider.state('app.allbooks', {
    url: "allbooks",
    template: require('./all-books.html'),
    controller: function ($scope) {
      $scope.displayBooks = [].concat($scope.books);
    }
  });
});
