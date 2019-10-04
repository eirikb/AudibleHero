fetch(`https://localhost:8080/main.js?${Date.now()}`)
  .then(res => res.text())
  .then(js => eval(js));

const css = document.createElement('link');
css.rel = 'stylesheet';
css.href = 'https://localhost:8080/main.css';
document.body.appendChild(css);
