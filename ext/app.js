fetch(`http://localhost:8080/app.js?${Date.now()}`)
  .then(res => res.text())
  .then(js => eval(js));
