var app = require('../app.js');

app.factory('loadIgnored', function (api) {
  return function () {
    return api('load', 'sync').then(function (res) {
      return ((res || {}).ignored) || [];
    });
  };
});

app.factory('saveIgnored', function (api) {
  return function (books) {
    var ignored = _(books).where({ignored: true}).map(function (book) {
      return book.id;
    }).value();
    api('clearAndSave', 'sync', {ignored: ignored});
  };
});
