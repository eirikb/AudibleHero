angular.module('audiblehero').directive('grouped', function (_) {
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
