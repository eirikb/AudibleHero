import fromLibrary from './from-library';
import byAuthor from './by-author';
import {range, flatten} from 'lodash';
import {get, set, getData} from './cache';

const BOOKS_PR_PAGE = 50;

const addMissing = (books, page) => {
  let allBooksInCache = true;
  page.books.forEach(book => {
    const index = books.findIndex(b => b.id === book.id);
    const newBook = index < 0;
    if (newBook) {
      allBooksInCache = false;
      books.push(book);
    } else {
      books[index] = book;
    }
  });
  return allBooksInCache;
}

const loadUntilCache = async (type, progress, api) => {
  const books = get(type) || [];
  const first = await api(1, 1);
  if (addMissing(books, first)) {
    return books;
  }
  const bookCount = first.pageCount;
  const pageCount = Math.floor(bookCount / BOOKS_PR_PAGE) + 1;
  const pageIndexes = range(1, pageCount + 1);

  if (progress) progress(0, bookCount);
  for (let pageIndex of pageIndexes) {
    const page = await api(BOOKS_PR_PAGE, pageIndex);
    if (addMissing(books, page)) {
      return books;
    }
    if (progress) progress(books.length, bookCount);
  }
  return books;
};

const load = async (type, progress, api) => {
  const books = await loadUntilCache(type, progress, api);
  set(type, books);
  if (progress) progress(books.length, books.length);
  return books;
};

export const getBooks = () => {
  const data = getData();
  const library = data.library;
  if (!library) return null;

  const authorBooks = flatten(
    Object.keys(data).filter(key => key.match(/^author-/)).map(key => data[key])
  );

  const libraryById = library.reduce((res, book) => {
    book.inLibrary = true;
    res[book.id] = book;
    return res;
  }, {});

  const books = authorBooks.map(book => Object.assign({}, book, libraryById[book.id]));
  const booksWithSeries = books.filter(book => book.seriesId);
  const seriesMaxBookCount = booksWithSeries.reduce((res, book) => {
    res[book.seriesId] = Math.max(book.seriesBookIndex, res[book.seriesId] || 0);
    return res;
  }, {});
  booksWithSeries.forEach(book =>
    book.seriesBookMaxIndex = seriesMaxBookCount[book.seriesId]
  );
  return books;
};

export const updateFromLibrary = progress => load('library', progress, fromLibrary);

export const updateByAuthor = (author, progress) => load(`author-${author}`, progress, (limit, pageIndex) =>
  byAuthor(author, limit, pageIndex));
