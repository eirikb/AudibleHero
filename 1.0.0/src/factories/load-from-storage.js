var app = require('../app.js');
var moment = require('moment');

app.factory('loadFromStorage', function (version, $q, api) {
  return function () {
    return $q(function (resolve) {
      api('load', 'local', 'data').then(function (data) {
        data = (data || {}).data;
        api('load', 'sync', 'ignored').then(function (ignored) {
          ignored = (ignored || {}).ignored;
          if (data) data.updated = new Date(data.updated);

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
    });
  };
});
