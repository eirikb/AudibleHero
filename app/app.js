var path = location.pathname.replace(/(ref=.*|\/)/g, '');
if (!path) {
  var script = document.createElement('script');
  script.src = '//eirikb.blob.core.windows.net/audiblehero/dev-eirik/app.js';
  document.head.appendChild(script);
}

function api(data) {
  document.dispatchEvent(new CustomEvent('audibleHeroC', {
    detail: data
  }));
}

var actions = {
  clear: function (type) {
    chrome.storage[type].clear(api);
  },
  load: function (type) {
    chrome.storage[type].get(api);
  },
  clearAndSave: function (type, data) {
    chrome.storage[type].clear(function () {
      chrome.storage[type].set(data, api);
    });
  }
};

document.addEventListener('audibleHeroS', function (e) {
  var fn = actions[e.detail.name];
  if (fn) fn(e.detail.type, e.detail.data);
});
