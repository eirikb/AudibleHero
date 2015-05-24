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
