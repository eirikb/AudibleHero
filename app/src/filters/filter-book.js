var app = require('../app.js');

app.filter('filterBooks', function () {
  return function (input, scope) {
    return _.filter(input, function (book) {
      if (scope.hideDuplicate && book.duplicate) return false;
      if (!scope.showIgnored && book.ignored) return false;
      return book.owned && scope.showOwned || !book.owned && scope.showMissing;
    });
  };
});
