import {parse, getPageCount, getBookId} from './parser';
import {last} from 'lodash';

const detectLanguage = text => new Promise(resolve => chrome.i18n.detectLanguage(text, resolve));

const padZero = part => ('0' + part).slice(-2);

const toDate = match => {
  const year = (match[0] > 50 ? '19' : '20') + match[0];
  const month = padZero(match[1]);
  const day = padZero(match[2]);
  return [year, month, day].join('-');
};

export default (author, limit, page) => fetch(`/search?searchRank=-publication_datesearch&searchSize=${limit}&searchPage=${page}&searchAuthor=${author}`, {
  credentials: 'include'
}).then(r =>
  r.text()
).then(async html => {
  const doc = parse(html);

  const rows = Array.from(doc.querySelectorAll('.adbl-result-item'));

  const books = await Promise.all(rows.map(async row => {
    const id = row.querySelector('[name=productAsin]').value;
    const title = row.querySelector('.adbl-prod-title').innerText.trim();

    const byRegex = regex => Array.from(row.querySelectorAll('li'))
      .map(node => ({
        text: node.innerText.trim(), node
      })).find(res => res.text.match(regex)) || {};

    const lengthText = byRegex(/^Length:/).text;
    let match = lengthText.match(/(\d+) hr/);
    const hours = match ? parseInt(match[1]) : 0;
    match = lengthText.match(/(\d+) min/);
    const mins = match ? parseInt(match[1]) : 0;
    const length = mins + hours * 60;
    const imageId = last(((row.querySelector('.adbl-prod-image') || {}).src || '').split('/')).split('.')[0];

    const releaseDateText = byRegex(/Release Date:/).text;
    match = (releaseDateText || '').match(/(\d+)-(\d+)-(\d+)/);
    const releaseDate = match ? toDate(match.slice(1)) : null;

    let seriesBookIndex = 0;
    let seriesId = null;
    const seriesNode = byRegex(/^Series:/).node;
    let seriesName = '';
    if (seriesNode) {
      seriesId = last(seriesNode.querySelector('a').href.split('='));
      seriesBookIndex = parseInt((seriesNode.innerText.match(/\d+/) || [])[0]) || 1;
      seriesName = seriesNode.querySelector('a').innerText;
    }

    const rating = parseInt((((row.querySelector('.adbl-rating-num') || {}).innerText || '').match(/\d+/) || [])[0]) || 0;

    const description = (row.querySelector('.socialTile-summary p') || {}).innerText || '';

    const languageRes = await detectLanguage(description);

    let language = languageRes && languageRes.isReliable && (languageRes.languages[0] || {}).language;
    if (!language) language = 'en';

    return {id, title, length, releaseDate, seriesBookIndex, seriesId, rating, language, imageId, seriesName};
  }));

  const pageCount = getPageCount(doc);

  return {books, pageCount};

});
