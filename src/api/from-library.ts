import { parse, getPageCount } from './parser';

export default (page: number) =>
  fetch(
    `/library/titles?programFilter=all&purchaseDateFilter=all&pageSize=${50}&page=${page}&sortBy=PURCHASE_DATE.dsc`,
    {
      credentials: 'include',
    }
  )
    .then(r => r.text())
    .then(html => {
      const doc = parse(html);

      const rows = Array.from(
        doc.querySelectorAll('[id^=adbl-library-content-row-]')
      );

      const books = rows.map(row => {
        const id = row.querySelector<HTMLInputElement>('[name=asin]')?.value;
        const authors = Array.from(
          row.querySelectorAll(
            'a[href^="/author/"],a[href^="/search"][href*="searchAuthor"]'
          )
        )
          .map(author => author?.textContent?.trim())
          .filter(author => author);

        const downloaded = !!row.querySelector('.bc-icon-check');

        return {
          id,
          authors,
          downloaded,
        };
      });

      const pageCount = getPageCount(doc);

      return { books, pageCount };
    })
    .catch(() => {
      window.location.href = '/library/titles';
    });