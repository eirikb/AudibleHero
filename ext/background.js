chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'Cookie') {
        if (details.url.match(/NOCOOKIE/)) {
          details.requestHeaders.splice(i, 1);
        }
        break;
      }
    }
    return {requestHeaders: details.requestHeaders};
  }, {
    urls: ['*://audible.com/*', '*://www.audible.com/*']
  },
  ['blocking', 'requestHeaders']);

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.match(/audible\.com/i)) {
    chrome.pageAction.show(tabId);
  }
});

chrome.pageAction.onClicked.addListener(function (tab) {
  var domain = tab.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
  chrome.tabs.update(tab.id, {url: "http://" + domain + "/audiblehero"});
});
