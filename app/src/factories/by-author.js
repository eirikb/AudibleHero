angular.module('audiblehero').factory('getBooksByAuthor', function ($http, $q, parseHtml, _, $) {
  function run(incognito, author, page) {
    if (!page) page = 1;

    return $http({
      url: "/search",
      params: {
        searchPage: page,
        searchSize: 50,
        searchAuthor: author,
        fix: incognito ? "NOCOOKIE" : ""
      }
    }).then(function (res) {
      var html = parseHtml(res.data);

      var books = [];

      html.find('.adbl-result-item').each(function () {
        var item = $(this);

        var url = item.find(".adbl-prod-title > a").attr("href").trim();
        url = url.replace(/\/ref=.*$/i, '');

        var series;
        var seriesDiv = item.find('.adbl-series-link');
        var seriesUrl = seriesDiv.find('a');
        if (seriesUrl.length > 0) {
          var seriesNumber = seriesDiv.find(".adbl-label").text().match(/\d+/);
          seriesNumber = seriesNumber && seriesNumber.length > 0 ? seriesNumber[0] : "";
          series = {
            name: seriesUrl.text().trim(),
            url: seriesUrl.attr('href').trim(),
            number: seriesNumber
          };
        }

        var length = item.find("span:contains('Length') ~ span").text().trim();
        var rs = item.find('.rating_disp').text().match(/\d+\.?\d*/g);
        var authors = [];
        item.find('.adbl-prod-author a').each(function () {
          authors.push($(this).text().trim());
        });

        var book = {
          id: _.last(url.split('/')),
          title: item.find(".adbl-prod-title > a").text().trim(),
          url: url,
          thumbnailUrl: item.find("img.adbl-prod-image").data("src").trim(),
          authors: authors,
          dateReleased: item.find("span:contains('Release Date') ~ span").text().trim(),
          length: length,
          score: rs ? parseFloat(rs[0]) : 0,
          ratings: rs ? parseInt(rs[1], 10) : 0,
          series: series
        };
        books.push(book);
      });

      var lastPage = parseInt(html.find('.adbl-page-link:last').text(), 10);
      if (page > 1 || _.isNaN(lastPage)) return books;

      var pages = [];
      for (var i = 2; i <= lastPage; i++) {
        pages.push(i);
      }

      return $q.all(_.map(pages, function (page) {
        return run(incognito, author, page);
      })).then(function (allBooks) {
        books = books.concat(_.flatten(allBooks));
        return books;
      })
    });
  }

  return run;
});
