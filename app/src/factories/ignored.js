var app = require('../app.js');

app.factory('saveIgnored', function ($rootScope, api) {
  return function () {
    var ignored = _($rootScope.books).where({ignored: true}).map(function (book) {
      return book.id;
    }).value();
    api('clearAndSave', 'sync', {ignored: ignored});
  };
});
