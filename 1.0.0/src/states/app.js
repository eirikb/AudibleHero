var app = require('../app.js');
require('lodash');

function missing(books, prop) {
  return _(books).filter(function (book) {
    return !!book[prop];
  }).groupBy(prop).map(function (group) {
    return {
      all: group,
      owned: _.where(group, {owned: true}),
      missing: _.filter(group, function (book) {
        return !book.owned;
      })
    }
  }).filter(function (group) {
    return group.owned.length > 0 && group.missing.length > 0;
  }).value();
}

app.config(function ($stateProvider) {
  $stateProvider.state('app', {
    template: require('../tpl/states/app.html'),
    controller: function ($scope, $state, loadFromStorage) {

      var data = $scope.data = loadFromStorage();
      if (data) {
        $scope.owned = _.where(data.books, {owned: true});

        $scope.series = missing(data.books, 'seriesId');
        $scope.authors = missing(data.books, 'authors');
      } else {
        $state.go('load');
      }

      $scope.filter = function (prop) {
        return _.where($scope.data.books, prop);
      };

      $scope.calcListenTime = function () {
        return Math.floor(_.sum($scope.filter({downloaded: true}), function (book) {
          return book.duration.asHours();
        }));
      };
    }
  });
});

app.run(function ($state) {
  $state.go('app');
});
