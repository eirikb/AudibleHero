import {parse, getBookId} from './parser';

export default (limit, page) => fetch(`/lib-ajax?progType=all&timeFilter=all&itemsPerPage=${limit}&page=${page}&sortType=down`, {
  credentials: 'include'
}).then(r =>
  r.text()
).then(html => {
  const doc = parse(html);

  const rows = Array.from(doc.querySelectorAll('[name=productCover]')).map(e => e.parentNode);

  const books = rows.map(row => {
    const id = getBookId(row.querySelector('.adbl-library-item-title a').href);
    const authors = row.querySelector('.adbl-library-item-author').innerText.split(',');

    return {
      id, authors
    };
  });

  const pageCountElement = doc.querySelector('.adbl-page-index .adbl-continue + .adbl-page-link .adbl-link');
  let pageCount = 0;
  if (pageCountElement) {
    pageCount = parseInt(pageCountElement.href.match(/\d+/)[0]);
  }

  return {books, pageCount};
});
