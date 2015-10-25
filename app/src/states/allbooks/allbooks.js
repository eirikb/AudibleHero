angular.module('audiblehero').config(function ($stateProvider) {
  $stateProvider.state('app.allbooks', {
    url: "allbooks",
    template: require('./allbooks.html'),
    controller: function ($scope) {
      $scope.displayBooks = [].concat($scope.books);
    }
  });
});
