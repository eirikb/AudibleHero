var inline = require('inline');
var version = inline(function (req) {
  return req('./package.json').version;
});
var _ = require('lodash');
var moment = require('moment');
var jQuery = require('jquery');

var app = angular.module('audiblehero', ['ui.router', 'angular.filter', 'smart-table'], function ($compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension):/);
});

app.config(function ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/newbooks');
});

app.constant('version', version);
app.constant('_', _);
app.constant('moment', moment);
app.constant('$', jQuery);

_(_).keys().each(function (key) {
  app.filter('_' + key, function () {
    return _[key];
  });
}).value();

document.title = "AudibleHero";
document.body.innerHTML = "";

function api(data) {
  document.dispatchEvent(new CustomEvent('audibleHeroC', {
    detail: data
  }));
}

function chunkString(str, len) {
  var size = Math.ceil(str.length / len);
  var res = new Array(size);
  var offset;

  for (var i = 0; i < size; i++) {
    offset = i * len;
    res[i] = str.substring(offset, offset + len);
  }

  return res;
}

var actions = {
  load: function (type) {
    chrome.storage[type].get(function (val) {
      try {
        var o = '';
        for (var i = 0; i < val.length; i++) {
          o += val['data-' + i];
        }
        o = JSON.parse(o);
        api(o);
      } catch (e) {
        api();
      }
    });
  },
  clearAndSave: function (type, data) {
    var storage = chrome.storage[type];
    storage.clear(function () {
      data = JSON.stringify(data);
      var size = Math.floor(storage.QUOTA_BYTES_PER_ITEM / 2);
      if (isNaN(size)) size = 5000;
      data = chunkString(data, size);
      var o = {
        length: data.length
      };
      data.forEach(function (part, i) {
        o['data-' + i] = part;
      });
      storage.set(o, api);
    });
  }
};

document.addEventListener('audibleHeroS', function (e) {
  var fn = actions[e.detail.name];
  if (fn) fn(e.detail.type, e.detail.data);
});
