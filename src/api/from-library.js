import {parse, getPageCount} from './parser';

export default (limit, page) => fetch(`/lib-ajax?progType=all&timeFilter=all&itemsPerPage=${limit}&page=${page}&sortType=down`, {
  credentials: 'include'
}).then(r =>
  r.text()
).then(html => {
  const doc = parse(html);

  const rows = Array.from(doc.querySelectorAll('[name=productCover]')).map(e => e.parentNode);

  const books = rows.map(row => {
    const id = row.querySelector('[name=asin]').value;
    const authors = row.querySelector('.adbl-library-item-author').innerText
      .split(',')
      .map(author => author.trim())
      .filter(author => author);

    const downloaded = !!row.querySelector('span[alt=Downloaded]');

    return {
      id, authors, downloaded
    };
  });

  const pageCount = getPageCount(doc);

  return {books, pageCount};
});
