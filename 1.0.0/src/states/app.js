var app = require('../app.js');
require('lodash');

app.filter('filterBooks', function () {
  return function (input, scope) {
    return _.filter(input, function (book) {
      return book.owned && scope.showOwned || !book.owned && scope.showMissing;
    })
  };
});

app.config(function ($stateProvider) {
  $stateProvider.state('app', {
    template: require('../tpl/states/app.html'),
    controller: function ($scope, $state, loadFromStorage) {

      var data = $scope.data = loadFromStorage();
      if (data) {
        $scope.books = data.books;
      } else {
        $state.go('load');
      }

      $scope.filter = function (prop) {
        return _.where($scope.data.books, prop);
      };

      $scope.calcListenTime = function (books) {
        if (books) {
          return Math.floor(_.sum(books), function (book) {
            return book.duration ? book.duration.asHours() : 0;
          });
        }
        return Math.floor(_.sum($scope.filter({downloaded: true}), function (book) {
          return book.duration ? book.duration.asHours() : 0;
        }));
      };
    }
  });
});

app.run(function ($state) {
  $state.go('app');
});
