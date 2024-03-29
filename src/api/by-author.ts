import { getPageCount, parse } from "./parser";
import { last } from "lodash";
import { Book } from "../types";

const detectLanguage = (text: string): Promise<string> =>
  new Promise((resolve) => {
    if (typeof chrome === "undefined") {
      resolve("en");
    }
    chrome.i18n.detectLanguage(text, (res) => {
      if (res.isReliable) resolve(res.languages[0].language);
      resolve("en");
    });
  });

const padZero = (part: string) => ("0" + part).slice(-2);

const toDate = (match: RegExpMatchArray) => {
  if (/\.co\.uk$/i.test(window.location.host)) {
    // dd-mm-yy
    const year = (+match[2] > 50 ? "19" : "20") + match[2];
    const month = padZero(match[1]);
    const day = padZero(match[0]);
    return [year, month, day].join("-");
  } else if (/\.com\.au$/i.test(window.location.host)) {
    // dd-mm-yyyy
    const year = match[2];
    const month = padZero(match[1]);
    const day = padZero(match[0]);
    return [year, month, day].join("-");
  } else {
    // mm-dd-yy
    const year = (+match[2] > 50 ? "19" : "20") + match[2];
    const month = padZero(match[0]);
    const day = padZero(match[1]);
    return [year, month, day].join("-");
  }
};

export async function parseByAuthorPage(html: string) {
  const doc = parse(html);

  const rows = Array.from(doc.querySelectorAll(".productListItem"));

  const books = (
    await Promise.all(
      rows.map(async (row) => {
        const heading = row.querySelector<HTMLLinkElement>(".bc-heading a");
        if (!heading) return null;
        const id = (heading.href.match(/(\w+)\?/) || [])[1];

        const title = heading.textContent?.trim() || "";

        const byRegex = (regex: RegExp) =>
          Array.from(row.querySelectorAll("li"))
            .map((node) => ({
              text: node.textContent?.trim(),
              node,
            }))
            .find((res) => res.text?.match(regex)) || {
            text: "",
            node: null,
          };

        const authors = Array.from(row.querySelectorAll(".authorLabel a"))
          .map((e) => e.textContent)
          .reduce((res: any, author, index) => {
            res[index] = author;
            return res;
          }, {});
        const lengthText = byRegex(/^Length:/).text || "";
        let match = lengthText.match(/(\d+) hr/);
        const hours = match ? parseInt(match[1]) : 0;
        match = lengthText.match(/(\d+) min/);
        const minutes = match ? parseInt(match[1]) : 0;
        const length = minutes + hours * 60;
        const imageId =
          last(
            (
              row.querySelector<HTMLImageElement>("a.bc-link img")?.src || ""
            ).split("/")
          )?.split(".")[0] || "";

        const releaseDateText = byRegex(/Release date:/).text;
        match = (releaseDateText || "").match(/(\d+)[-/](\d+)[-/](\d+)/);
        const releaseDate = match ? toDate(match.slice(1)) : "";

        let seriesBookIndex;
        let seriesId;
        const seriesNode = byRegex(/^Series:/).node;
        let seriesName = "";
        if (seriesNode) {
          const seriesLink = seriesNode.querySelector("a");
          if (seriesLink) {
            seriesId = seriesLink.href.split(/\//).slice(-1)[0].split("?")[0];
            seriesBookIndex = parseFloat(
              (seriesNode.textContent?.match(/book (\d+)/i) || [])[1]
            );
            seriesName = seriesLink.textContent || "";
          }
        }

        const rating =
          parseFloat(
            ((
              (row.querySelector(".ratingsLabel") || {}).textContent || ""
            ).match(/\d+(?:,\d+)*(?:\.\d+)?/g) || [])[0]
          ) || 0;

        const description = Array.from(
          row.querySelectorAll(`#product-list-flyout-${id} p`)
        )
          .map((e) => e?.textContent?.trim())
          .join(" ")
          .trim();

        const language = await detectLanguage(description);

        const res: Book = {
          id,
          title,
          length,
          releaseDate,
          seriesBookIndex,
          seriesId,
          rating,
          language,
          imageId,
          seriesName,
          authors,
          inLibrary: false,
        };
        return res;
      })
    )
  ).filter((book): book is Book => book !== null);

  const pageCount = getPageCount(doc);

  return { books, pageCount };
}

export default (author: string, page: number) =>
  fetch(
    `/search?searchAuthor=${author}&sort=pubdate-desc-rank&pageSize=${50}&page=${page}`,
    {
      credentials: "include",
    }
  )
    .then((r) => r.text())
    .then(parseByAuthorPage);
