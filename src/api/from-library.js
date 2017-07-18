export default (limit, page) => fetch(`/lib-ajax?progType=all&timeFilter=all&itemsPerPage=${limit}&page=${page}&sortType=down`, {
  credentials: 'include'
}).then(r =>
  r.text()
).then(html => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const rows = Array.from(doc.querySelectorAll('[name=productCover]')).map(e => e.parentNode);

  const books = rows.map(row => {
    const title = row.querySelector('h3').innerText;
    const authors = row.querySelector('.adbl-library-item-author').innerText.split(',');
    const rating = parseInt(row.querySelector('.adbl-rating-num').innerText.match(/\d+/)[0]);

    return {
      title, authors, rating
    };
  });

  const pageCountElement = doc.querySelector('.adbl-page-index .adbl-continue + .adbl-page-link .adbl-link');
  let pageCount = 0;
  if (pageCountElement) {
    pageCount = parseInt(pageCountElement.href.match(/\d+/)[0]);
  }

  return {books, pageCount};
});
