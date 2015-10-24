angular.module('audiblehero').factory('saveIgnored', function ($rootScope, api, _) {
  return function () {
    var ignored = _($rootScope.books).where({ignored: true}).map(function (book) {
      return book.id;
    }).value();
    api('clearAndSave', 'sync', {ignored: ignored});
  };
});
