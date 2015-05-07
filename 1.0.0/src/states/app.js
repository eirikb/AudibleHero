var app = require('../app.js');
require('lodash');
var moment = require('moment');

function loadData() {
  var data;
  try {
    data = JSON.parse(localStorage.data);
  } catch (e) {
    return;
  }
  _.each(data.books, function (book) {
    var duration = book.length.match(/\d+/g);
    book.duration = moment.duration({
      hours: duration.length >= 2 ? duration[0] : 0,
      minutes: duration.length >= 2 ? duration[1] : duration[0]
    });

    book.datePurchased = moment(book.datePurchased, 'MM-DD-YY');
    book.dateReleased = moment(book.dateReleased, 'MM-DD-YY');

    var seriesId = ('' + book.seriesUrl).match(/asin=(.*)/i);
    if (seriesId && seriesId.length > 1) book.seriesId = seriesId[1];
  });

  return data;
}

app.config(function ($stateProvider) {
  $stateProvider.state('app', {
    template: require('../tpl/states/app.html'),
    controller: function ($scope, $state) {

      var data = $scope.data = loadData();
      if (data) {
        $scope.owned = _.where(data.books, {owned: true});

        $scope.series = _(data.books).groupBy('seriesId').filter(function (series) {
          return _.any(series, 'owned');
        }).map(function (series) {
          return {
            all: series,
            owned: _.where(series, {owned: true}),
            missing: _.where(series, {owned: false})
          }
        }).filter(function (serie) {
          return serie.missing.length > 0;
        }).value();
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
