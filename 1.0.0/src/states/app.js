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
  data.books = _(data.books).map(function (book) {
    var duration = book.length.match(/\d+/g);
    if (duration && duration.length > 1) {
      book.duration = moment.duration({
        hours: duration.length >= 2 ? duration[0] : 0,
        minutes: duration.length >= 2 ? duration[1] : duration[0]
      });
    }

    book.datePurchased = moment(book.datePurchased, 'MM-DD-YY');
    book.dateReleased = moment(book.dateReleased, 'MM-DD-YY');

    if (book.series) {
      var seriesId = book.series.url.match(/asin=(.*)/i);
      if (seriesId && seriesId.length > 1) book.seriesId = seriesId[1];
    }
    return book;
  }).uniq(function (book) {
    return book.title;
  }).value();

  return data;
}

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
    controller: function ($scope, $state) {

      var data = $scope.data = loadData();
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
