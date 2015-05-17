var app = require('../app.js');

app.factory('parseHtml', function () {
  return function (html) {
    html = html.replace(/<img[^>]*>/g, function (img) {
      return img.replace(/ src=/i, ' data-src=');
    });
    var parser = new DOMParser();
    return $(parser.parseFromString(html, "text/html"));
  };
});