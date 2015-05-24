var app = require('../app.js');

app.factory('loadIgnored', function () {
  return function () {
    try {
      return JSON.parse(localStorage.ignored);
    } catch (e) {
      return [];
    }
  };
});

app.factory('saveIgnored', function () {
  return function (books) {
    var ignored = _(books).where({ignored: true}).map(function (book) {
      return book.id;
    }).value();
    localStorage.ignored = JSON.stringify(ignored);
  };
});
