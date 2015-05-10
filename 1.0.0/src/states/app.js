var app = require('../app.js');
require('lodash');

function byOwned(group) {
  return {
    all: group,
    owned: _.where(group, {owned: true}),
    missing: _.reject(group, 'owned')
  };
}

function byOwnedAndMissing(group) {
  return group.owned.length > 0 && group.missing.length > 0;
}

app.config(function ($stateProvider) {
  $stateProvider.state('app', {
    template: require('../tpl/states/app.html'),
    controller: function ($scope, $state, loadFromStorage) {

      var data = $scope.data = loadFromStorage();
      if (data) {
        $scope.owned = _.where(data.books, {owned: true});

        $scope.series = _(books).filter('seriesId').groupBy('seriesId').map(byOwned).filter(byOwnedAndMissing).map(function (group) {
          var b = group.owned[0];
          group.key = b.authors.join(',') + ' - ' + b.series.name;
          return group;
        }).value();

        $scope.authors = _(books).map(function (book) {
          return _.map(book.authors, function (author) {
            return _.assign({
              author: author
            }, book);
          });
        }).flatten().groupBy('author').map(byOwned).filter(byOwnedAndMissing).map(function (group) {
          var b = group.owned[0];
          group.key = b.author;
          if (b.series) group.key += " - " + b.series.name;
          return group;
        }).value();

      } else {
        $state.go('load');
      }

      $scope.filter = function (prop) {
        return _.where($scope.data.books, prop);
      };

      $scope.calcListenTime = function () {
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
