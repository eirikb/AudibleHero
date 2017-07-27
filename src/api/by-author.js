import {parse, getPageCount, getBookId} from './parser';
import {last} from 'lodash';

const detectLanguage = text => new Promise(resolve => chrome.i18n.detectLanguage(text, resolve));

export default (author, limit, page) => fetch(`/search?searchRank=-publication_datesearch&searchSize=${limit}&searchPage=${page}&searchAuthor=${author}`, {
  credentials: 'include'
}).then(r =>
  r.text()
).then(async html => {
  const doc = parse(html);

  const rows = Array.from(doc.querySelectorAll('.adbl-result-item'));

  const books = await Promise.all(rows.map(async row => {
    const id = getBookId(row.querySelector('.adbl-prod-title a').href);
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

    const releaseDateText = byRegex(/^Release Date:/).text;
    match = (releaseDateText || '').match(/(\d+)-(\d+)-(\d+)/);
    const releaseDate = match ? new Date('20' + match[3], match[1] - 1, match[2]) : null;

    let seriesBookIndex = 0;
    let seriesId = null;
    const seriesNode = byRegex(/^Series:/).node;
    if (seriesNode) {
      seriesId = last(seriesNode.querySelector('a').href.split('='));
      seriesBookIndex = parseInt((seriesNode.innerText.match(/\d+/) || [])[0]) || 1;
    }

    const rating = parseInt((((row.querySelector('.adbl-rating-num') || {}).innerText || '').match(/\d+/) || [])[0]) || 0;

    const description = (row.querySelector('.socialTile-summary p') || {}).innerText || '';

    const languageRes = await detectLanguage(description);

    let language = languageRes && languageRes.isReliable && (languageRes.languages[0] || {}).language;
    if (!language) language = 'en';

    return {id, title, length, releaseDate, seriesBookIndex, seriesId, rating, language};
  }));

  const pageCount = getPageCount(doc);

  return {books, pageCount};

});

// const parseHtml = html => {
//   html = html.replace(/<img[^>]*>/g, function (img) {
//     return img.replace(/ src=/i, ' data-src=');
//   });
//   var parser = new DOMParser();
//   return $(parser.parseFromString(html, "text/html"));
// };
//
// export const run = (incognito, author, page) => {
//   if (!page) page = 1;
//
//   return fetch(`/search?searchPage=${page}&searchSize=50&searchAuthor=${author}&fix=${incognito ? 'NOCOOKIE' : ''}`)
//     .then(function (res) {
//       var html = parseHtml(res.data);
//
//       var books = [];
//
//       html.find('.adbl-result-item').each(function () {
//         var item = $(this);
//
//         var url = item.find(".adbl-prod-title > a").attr("href").trim();
//         url = url.replace(/\/ref=.*$/i, '');
//
//         var series;
//         var seriesDiv = item.find('.adbl-series-link');
//         var seriesUrl = seriesDiv.find('a');
//         if (seriesUrl.length > 0) {
//           var seriesNumber = seriesDiv.find(".adbl-label").text().match(/\d+/);
//           seriesNumber = seriesNumber && seriesNumber.length > 0 ? seriesNumber[0] : "";
//           series = {
//             name: seriesUrl.text().trim(),
//             url: seriesUrl.attr('href').trim(),
//             number: seriesNumber
//           };
//         }
//
//         var length = item.find("span:contains('Length') ~ span").text().trim();
//         var rs = item.find('.rating_disp').text().match(/\d+\.?\d*/g);
//         var authors = [];
//         item.find('.adbl-prod-author a').each(function () {
//           authors.push($(this).text().trim());
//         });
//
//         var book = {
//           id: _.last(url.split('/')),
//           title: item.find(".adbl-prod-title > a").text().trim(),
//           url: url,
//           thumbnailUrl: item.find("img.adbl-prod-image").data("src").trim(),
//           authors: authors,
//           dateReleased: item.find("span:contains('Release Date') ~ span").text().trim(),
//           length: length,
//           score: rs ? parseFloat(rs[0]) : 0,
//           ratings: rs ? parseInt(rs[1], 10) : 0,
//           series: series
//         };
//         books.push(book);
//       });
//
//       var lastPage = parseInt(html.find('.adbl-page-link:last').text(), 10);
//       if (page > 1 || _.isNaN(lastPage)) return books;
//
//       var pages = [];
//       for (var i = 2; i <= lastPage; i++) {
//         pages.push(i);
//       }
//
//       return Promise.all.all(_.map(pages, function (page) {
//         return run(incognito, author, page);
//       })).then(function (allBooks) {
//         books = books.concat(_.flatten(allBooks));
//         return books;
//       });
//     });
// };
