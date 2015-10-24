angular.module('audiblehero').filter('filterBooks', function (_) {
  return function (input, scope) {
    return _.filter(input, function (book) {
      if (scope.hideDuplicate && book.duplicate) return false;
      if (!scope.showIgnored && book.ignored) return false;
      return book.owned && scope.showOwned || !book.owned && scope.showMissing;
    });
  };
});
