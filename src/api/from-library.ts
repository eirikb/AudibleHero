import { parse, getPageCount } from "./parser";
import { LibraryBook } from "../types";

export function parseLibraryPage(html: string) {
  const doc = parse(html);

  const rows = Array.from(
    doc.querySelectorAll("[id^=adbl-library-content-row-]")
  );

  const books = rows.map((row) => {
    const id = row.querySelector<HTMLInputElement>("[name=asin]")?.value;
    const authors = Array.from(
      row.querySelectorAll(
        'a[href^="/author/"],a[href^="/search"][href*="searchAuthor"]'
      )
    )
      .map((author) => author?.textContent?.trim())
      .filter((author) => author);

    return {
      id,
      authors,
    } as LibraryBook;
  });

  const pageCount = getPageCount(doc);

  return { books, pageCount };
}

export default (page: number) =>
  fetch(
    `/library/titles?programFilter=all&purchaseDateFilter=all&pageSize=${50}&page=${page}&sortBy=PURCHASE_DATE.dsc`,
    {
      credentials: "include",
    }
  )
    .then((r) => r.text())
    .then(parseLibraryPage)
    .catch((e) => {
      window.location.href = "/library/titles";
      throw e;
    });
