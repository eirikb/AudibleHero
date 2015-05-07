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
  });

  return data;
}

app.config(function ($stateProvider) {
  $stateProvider.state('app', {
    template: require('../tpl/states/app.html'),
    controller: function ($scope, $state) {

      var data = $scope.data = loadData();
      if (!data) {
        $state.go('load');
      }

      $scope.filter = function (prop) {
        return _.where($scope.data.books, prop);
      };

      $scope.calcListenTime = function () {
        var sum = 0;
        _.each(filer({downloaded: true}), function (book) {
          console.log(book.duration.asHours());
          sum += book.duration.asHours();
        });
        return sum;
      };
    }
  });
});

app.run(function ($state) {
  $state.go('app');
});
