angular.module('audiblehero').config(function ($stateProvider, _) {
  $stateProvider.state('app', {
    url: "/",
    template: require('./app.html'),
    controller: function ($rootScope, $scope, $state, loadFromStorage) {

      function asGroup(group) {
        group.key = _.first(group, {owned: true});
        group.hasOwnAndMissing = _.some(group, 'owned') && _.some(group, 'missing');
        _.each(group, function (book) {
          book.duplicate = book.missing && _.some(group, {owned: true, series: {number: (book.series || {}).number}});
        });
        return group;
      }

      $scope.loading = true;

      loadFromStorage().then(function (data) {
        if (data) {
          $scope.data = data;
          $rootScope.books = $scope.books = data.books;

          $scope.bySeries = _(data.books).filter(function (book) {
            return !!book.seriesId;
          }).groupBy('seriesId').map(asGroup).map(function (group) {
            group.title = group.key.series.name;
            group.url = "http://www.audible.com/series/?asin=" + group.key.seriesId;
            return group;
          }).value();

          $scope.loading = false;
        } else {
          $state.go('load');
        }
      });
    }
  });
});
