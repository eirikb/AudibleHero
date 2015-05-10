var path = location.pathname.replace(/(ref=.*|\/)/g, '');
if (!path) {
  var script = document.createElement('script');
  script.src = '//eirikb.blob.core.windows.net/audiblehero/dev-eirik/app.js';
  document.head.appendChild(script);
}
