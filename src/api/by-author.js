import {parse, getPageCount, getBookId} from './parser';
import {last} from 'lodash';

const detectLanguage = text => new Promise(resolve => chrome.i18n.detectLanguage(text, resolve));

const padZero = part => ('0' + part).slice(-2);

const toDate = match => {
  if (/\.co.uk$|\.com\.au$/i.test(window.location.host)) {
    // dd/mm/yyyy
    const year = match[2];
    const month = padZero(match[1]);
    const day = padZero(match[0]);
    return [year, month, day].join('-');
  } else {
    // mm-dd-yy
    const year = (+match[2] > 50 ? '19' : '20') + match[2];
    const month = padZero(match[0]);
    const day = padZero(match[1]);
    return [year, month, day].join('-');
  }
};

export default (author, limit, page) => fetch(`/search?keywords=${author}&sort=pubdate-desc-rank&pageSize=${limit}&page=${page}`, {
  credentials: 'include'
}).then(r =>
  r.text()
).then(async html => {
  const doc = parse(html);

  const rows = Array.from(doc.querySelectorAll('.productListItem'));

  const books = await Promise.all(rows.map(async row => {
    const heading = row.querySelector('.bc-heading a');
    const id = heading.href.match(/(\w+)\?/)[1];

    const title = heading.innerText.trim();

    const byRegex = regex => Array.from(row.querySelectorAll('li'))
      .map(node => ({
        text: node.innerText.trim(), node
      })).find(res => res.text.match(regex)) || {};

    const authors = Array.from(row.querySelectorAll('.authorLabel a')).map(e => e.innerText);
    const lengthText = byRegex(/^Length:/).text;
    let match = lengthText.match(/(\d+) hr/);
    const hours = match ? parseInt(match[1]) : 0;
    match = lengthText.match(/(\d+) min/);
    const mins = match ? parseInt(match[1]) : 0;
    const length = mins + hours * 60;
    const imageId = last(((row.querySelector('.bc-lazy-load') || {}).src || '').split('/')).split('.')[0];

    const releaseDateText = byRegex(/Release date:/).text;
    match = (releaseDateText || '').match(/(\d+)[-\/](\d+)[-\/](\d+)/);
    const releaseDate = match ? toDate(match.slice(1)) : null;

    let seriesBookIndex = '';
    let seriesId = null;
    const seriesNode = byRegex(/^Series:/).node;
    let seriesName = '';
    if (seriesNode) {
      seriesId = seriesNode.querySelector('a').href.match(/asin=(\w*)/)[1];
      seriesBookIndex = seriesNode.innerText.trim().split(', Book ')[1];
      seriesName = seriesNode.querySelector('a').innerText;
    }

    const rating = parseInt((((row.querySelector('.ratingsLabel') || {}).innerText || '').match(/\d+/g) || []).join('')) || 0;

    const description = (row.querySelector(`#product-list-flyout-${id} p`) || {}).innerText || '';

    const languageRes = await detectLanguage(description);

    let language = languageRes && languageRes.isReliable && (languageRes.languages[0] || {}).language;
    if (!language) language = 'en';

    return {id, title, length, releaseDate, seriesBookIndex, seriesId, rating, language, imageId, seriesName, authors};
  }));

  const pageCount = getPageCount(doc);

  return {books, pageCount};

});
