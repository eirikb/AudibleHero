var app = require('../../app.js');
var _ = require('lodash');

app.directive('grouped', function () {
  return {
    scope: {
      grouped: '='
    },
    template: require('./grouped.html'),
    controller: function ($scope, _, saveIgnored) {
      $scope.ignore = function (event, books) {
        event.preventDefault();

        _.each(books, function (book) {
          book.ignored = true;
        });

        saveIgnored();
      };
    }
  };
});
