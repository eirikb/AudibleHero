export default () => fetch('/lib-ajax?progType=all&timeFilter=all&itemsPerPage=100000', {
  credentials: 'include'
}).then(r =>
  r.text()
).then(html => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const rows = Array.from(doc.querySelectorAll('[name=productCover]')).map(e => e.parentNode);

  return rows.map(row => {
    const title = row.querySelector('h3').innerText;
    const authors = row.querySelector('.adbl-library-item-author').innerText.split(',');
    const rating = parseInt(row.querySelector('.adbl-rating-num').innerText.match(/\d+/)[0]);

    return {
      title, authors, rating
    };
  });
});
