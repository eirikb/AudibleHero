var app = require('../app.js');
var moment = require('moment');

app.factory('loadFromStorage', function (version, $q, api, loadIgnored) {
  return function () {
    return $q(function (resolve) {
      $q.all({
        data: api('load', 'local'),
        ignored: loadIgnored
      }).then(function (res) {
        var data = res.data;
        if (data) data.updated = new Date(data.updated);
        var ignored = res.ignored;

        if (!data || !data.books) {
          resolve();
          return;
        }

        data.books = _(data.books).map(function (book) {
          var duration = book.length.match(/\d+/g);
          if (duration && duration.length > 1) {
            book.duration = moment.duration({
              hours: duration.length >= 2 ? duration[0] : 0,
              minutes: duration.length >= 2 ? duration[1] : duration[0]
            });
          }

          book.missing = !book.owned;

          book.ignored = _.contains(ignored, book.id);

          if (book.series) {
            var seriesId = book.series.url.match(/asin=(.*)/i);
            if (seriesId && seriesId.length > 1) book.seriesId = seriesId[1];
            var number = _.parseInt(book.series.number);
            if (!_.isNaN(number)) book.series.number = number;
          }
          return book;
        }).value();

        resolve(data);
      });
    });
  };
});
