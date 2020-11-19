import { Book, LibraryBook } from 'types';

export function joinLibraryBooksAndAuthorsBooks(
  library: LibraryBook[],
  books: Book[]
): void {
  const libraryBooksMap = library.reduce(
    (res: { [key: string]: LibraryBook }, book) => {
      res[book.id] = book;
      return res;
    },
    {}
  );

  const series: {
    [key: string]: {
      maxIndex: number;
      libraryCount: number;
      inLibrary: boolean;
    };
  } = {};

  for (let book of books) {
    book.inLibrary = !!libraryBooksMap[book.id];
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
  for (let book of books) {
    if (book.seriesId) {
      const serie = series[book.seriesId]!!;
      book.seriesInLibraryCount = serie.libraryCount;
      book.seriesBookMaxIndex = serie.maxIndex;
      book.seriesInLibrary = serie.inLibrary;
      book.seriesBookIndexInLibrary = book.inLibrary && serie.inLibrary;
    }
  }
}
