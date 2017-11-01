chrome.webRequest.onBeforeSendHeaders.addListener(details => {
    if (!details.url.match(/NOCOOKIE/)) return;
    for (let i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'Cookie') {
        details.requestHeaders.splice(i, 1);
        break;
      }
    }
    return {requestHeaders: details.requestHeaders};
  }, {
    urls: ['*://www.audible.com/*', '*://www.audible.co.uk/*', '*://www.audible.com.au/*']
  },
  ['blocking', 'requestHeaders']);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = new URL(tab.url);
  if (['www.audible.com', 'www.audible.co.uk', 'www.audible.com.au'].includes(url.host)) {
    chrome.pageAction.show(tabId);
  }
});

chrome.pageAction.onClicked.addListener(tab => {
  const url = new URL(tab.url);
  chrome.tabs.update(tab.id, {url: `${url.origin}/legal-terms?audible=hero`});
});
