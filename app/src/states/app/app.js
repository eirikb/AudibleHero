var app = require('../../app.js');
var _ = require('lodash');

function asGroup(group) {
  group.key = _.first(group, {owned: true});
  group.hasOwnAndMissing = _.some(group, 'owned') && _.some(group, 'missing');
  _.each(group, function (book) {
    book.duplicate = book.missing && _.some(group, {owned: true, series: {number: (book.series || {}).number}});
  });
  return group;
}

app.config(function ($stateProvider) {
  $stateProvider.state('app', {
    url: "/",
    template: require('./app.html'),
    controller: function ($rootScope, $scope, $state, loadFromStorage) {
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

          $scope.byAuthor = _(data.books).map(function (book) {
            return _.map(book.authors, function (author) {
              return _.assign({
                author: author
              }, book);
            });
          }).flatten().groupBy('author').map(asGroup).map(function (group) {
            group.title = group.key.author;
            group.url = "http://www.audible.com/search?searchAuthor=" + group.title;
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
