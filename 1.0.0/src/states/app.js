var app = require('../app.js');

app.filter('filterBooks', function () {
  return function (input, scope) {
    return _.filter(input, function (book) {
      if (scope.hideDuplicate && book.duplicate) return false;
      return book.owned && scope.showOwned || !book.owned && scope.showMissing;
    })
  };
});

app.filter('hasProp', function (_) {
  return function (input, prop) {
    return _.filter(input, function (i) {
      return !!i[prop]
    });
  };
});

app.filter('ownedAndMissing', function (_) {
  return function (input) {
    return _.some(input, 'owned') && _.some(input, 'missing');
  };
});

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
    template: require('../tpl/states/app.html'),
    controller: function ($scope, $state, loadFromStorage) {

      var data = $scope.data = loadFromStorage();
      if (data) {
        $scope.books = data.books;

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

      } else {
        $state.go('load');
      }
    }
  });
});

app.run(function ($state) {
  $state.go('app');
});
