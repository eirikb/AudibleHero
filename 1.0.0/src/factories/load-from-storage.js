var app = require('../app.js');
var moment = require('moment');

app.factory('loadFromStorage', function (version) {
  return function () {
    var data;
    try {
      data = JSON.parse(localStorage.data);
      if (data.version !== version) return;
    } catch (e) {
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

      if (book.datePurchased) {
        book.datePurchased = moment(book.datePurchased, 'MM-DD-YY');
      }
      if (book.dateReleased) {
        book.dateReleased = moment(book.dateReleased, 'MM-DD-YY');
      }

      book.missing = !book.owned;

      if (book.series) {
        var seriesId = book.series.url.match(/asin=(.*)/i);
        if (seriesId && seriesId.length > 1) book.seriesId = seriesId[1];
        var number = _.parseInt(book.series.number);
        if (!_.isNaN(number)) book.series.number = number;
      }
      return book;
    }).value();

    return data;
  };
});
