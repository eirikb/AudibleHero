fetch(`https://localhost:8080/main.js?${Date.now()}`)
  .then((res) => res.text())
  .then((js) => eval(js));
