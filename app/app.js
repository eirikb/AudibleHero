var path = location.pathname.replace(/(ref=.*|\/)/g, '');
if (!path) {
  var script = document.createElement('script');
  script.src = '//eirikb.blob.core.windows.net/audiblehero/1.0.0/app.js';
  document.head.appendChild(script);
}
