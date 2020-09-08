import test from 'ava';
import { joinLibraryBooksAndAuthorsBooks } from '../src/api/series';
import { Book, LibraryBook } from '../src/types';

function dummyBook(
  id: string,
  seriesId?: string,
  seriesBookIndex?: number
): Book {
  return {
    id,
    seriesId,
    seriesBookIndex,
    title: '',
    authors: {},
    imageId: '',
    inLibrary: false,
    language: '',
    length: 0,
    rating: 0,
    releaseDate: '',
    seriesName: '',
  };
}

function dummyLibraryBook(id: string): LibraryBook {
  return {
    id,
    authors: [],
  };
}

test('inLibrary', t => {
  const library = [dummyLibraryBook('a')];
  const books = [dummyBook('a'), dummyBook('b')];
  joinLibraryBooksAndAuthorsBooks(library, books);
  t.is(books[0].inLibrary, true);
  t.is(books[1].inLibrary, false);
});

test('series max count', t => {
  const library: LibraryBook[] = [];
  const books = [dummyBook('a', 'x', 1), dummyBook('b', 'x', 7)];
  joinLibraryBooksAndAuthorsBooks(library, books);
  t.is(books[0].seriesBookIndex, 1);
  t.is(books[1].seriesBookIndex, 7);
  t.is(books[0].seriesInLibraryCount, 0);
  t.is(books[1].seriesInLibraryCount, 0);
  t.is(books[0].seriesBookMaxIndex, 7);
  t.is(books[1].seriesBookMaxIndex, 7);
});

test('series in library count', t => {
  const library = [dummyLibraryBook('a'), dummyLibraryBook('c')];
  const books = [
    dummyBook('a', 'x', 1),
    dummyBook('b', 'x', 7),
    dummyBook('c', 'x', 3),
  ];
  joinLibraryBooksAndAuthorsBooks(library, books);
  t.is(books[0].seriesBookIndex, 1);
  t.is(books[1].seriesBookIndex, 7);
  t.is(books[2].seriesBookIndex, 3);
  t.is(books[0].seriesInLibraryCount, 2);
  t.is(books[1].seriesInLibraryCount, 2);
  t.is(books[2].seriesInLibraryCount, 2);
  t.is(books[0].seriesBookMaxIndex, 7);
  t.is(books[1].seriesBookMaxIndex, 7);
  t.is(books[2].seriesBookMaxIndex, 7);
});

test('series in library', t => {
  const library = [dummyLibraryBook('a'), dummyLibraryBook('b')];
  const books = [
    dummyBook('a', 'x', 1),
    dummyBook('b', 'x', 2),
    dummyBook('c', 'y', 3),
    dummyBook('d', 'x', 3),
  ];
  joinLibraryBooksAndAuthorsBooks(library, books);
  t.is(books[0].seriesBookIndex, 1);
  t.is(books[1].seriesBookIndex, 2);
  t.is(books[2].seriesBookIndex, 3);
  t.is(books[3].seriesBookIndex, 3);

  t.is(books[0].seriesInLibrary, true);
  t.is(books[1].seriesInLibrary, true);
  t.is(books[2].seriesInLibrary, false);
  t.is(books[3].seriesInLibrary, true);

  t.is(books[0].seriesInLibraryCount, 2);
  t.is(books[1].seriesInLibraryCount, 2);
  t.is(books[2].seriesInLibraryCount, 0);
  t.is(books[3].seriesInLibraryCount, 2);

  t.is(books[0].seriesBookMaxIndex, 3);
  t.is(books[1].seriesBookMaxIndex, 3);
  t.is(books[2].seriesBookMaxIndex, 3);
  t.is(books[3].seriesBookMaxIndex, 3);

  t.is(books[0].seriesBookIndexInLibrary, true);
  t.is(books[1].seriesBookIndexInLibrary, true);
  t.is(books[2].seriesBookIndexInLibrary, false);
  t.is(books[3].seriesBookIndexInLibrary, false);
});
