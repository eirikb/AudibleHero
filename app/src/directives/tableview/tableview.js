angular.module('audiblehero').directive('tableview', function () {
  return {
    scope: {
      books: '='
    },
    template: require('./tableview.html'),
    controller: function ($scope) {
      $scope.displayBooks = [].concat($scope.books);
    }
  };
});