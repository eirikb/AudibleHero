var app = require('../app.js');

app.directive('grouped', function () {
  return {
    scope: {
      grouped: '='
    },
    template: require('../tpl/directives/grouped.html'),
    controller: function ($scope, saveIgnored, _) {
      $scope.ignore = function (event, books) {
        event.preventDefault();

        _.each(books, function (book) {
          book.ignored = true;
        });
        saveIgnored($scope.books);
      }
    }
  }
});
