if (location.pathname.match(/audiblehero/g)) {
  var script = document.createElement('script');
  script.src = 'http://localhost:8000/app.js';
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
  load: function (type, prop) {
    chrome.storage[type].get(prop, api);
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
