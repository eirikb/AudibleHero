var app = require('../app.js');

app.factory('getLibraryBooks', function ($http) {
  return function () {
    return $http({
      url: '/lib-ajax',
      params: {
        progType: 'all', timeFilter: 'all', itemsPerPage: 1000000
      }
    }).then(function (res) {
      var html = $(res.data);

      var rows = html.find("table:eq(0) tr:not(.adbl-lib-multipart-child) td[name='titleInfo']");
      var books = [];
      rows.each(function () {
        var cell = $(this);
        var row = cell.parent();

        var url = cell.find("a[name='tdTitle']").attr('href').trim();

        books.push({
          id: _.last(url.split('/')),
          title: cell.find("a[name='tdTitle']").text().trim(),
          authors: _.map(row.find("a[href*='searchAuthor']").text().split(','), function (author) {
            return author.trim();
          }),
          datePurchased: row.find("td:eq(6)").text().trim(),
          downloaded: row.find("[alt='Downloaded']").length > 0
        });
      });
      return books;
    });
  };
});