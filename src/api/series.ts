import { Book, LibraryBook } from "types";

export function joinLibraryBooksAndAuthorsBooks(
  library: LibraryBook[],
  books: Book[]
): void {
  const libraryIdSet = new Set(library.map((l) => l.id.toLowerCase()));

  const series: {
    [key: string]: {
      maxIndex: number;
      libraryCount: number;
      inLibrary: boolean;
    };
  } = {};

  for (const book of books) {
    book.inLibrary = libraryIdSet.has(book.id.toLowerCase());
    if (book.seriesId) {
      let serie = series[book.seriesId];
      if (!serie) {
        serie = { libraryCount: 0, maxIndex: 0, inLibrary: false };
        series[book.seriesId] = serie;
      }
      serie.maxIndex = Math.max(book.seriesBookIndex || 0, serie.maxIndex);
      if (book.inLibrary) {
        serie.libraryCount++;
        serie.inLibrary = true;
      }
    }
  }
  for (const book of books) {
    if (book.seriesId) {
      const serie = series[book.seriesId]!;
      book.seriesInLibraryCount = serie.libraryCount;
      book.seriesBookMaxIndex = serie.maxIndex;
      book.seriesInLibrary = serie.inLibrary;
      book.seriesBookIndexInLibrary = book.inLibrary && serie.inLibrary;
    }
  }
}
