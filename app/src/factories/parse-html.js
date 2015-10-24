angular.module('audiblehero').factory('parseHtml', function (_, $) {
  return function (html) {
    html = html.replace(/<img[^>]*>/g, function (img) {
      return img.replace(/ src=/i, ' data-src=');
    });
    var parser = new DOMParser();
    return $(parser.parseFromString(html, "text/html"));
  };
});