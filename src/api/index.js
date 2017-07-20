import fromLibrary from './from-library';
import {range, some} from 'lodash';

const BOOKS_PR_PAGE = 50;

const loadCache = name => {
  try {
    return JSON.parse(localStorage[name]);
  } catch (ignored) {
    return null;
  }
}

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

const loadUntilCache = async (type, api) => {
  const books = loadCache(type) || [];
  const first = await api(1, 1);
  if (addMissing(books, first)) {
    return books;
  }
  const bookCount = first.pageCount + 1;
  const pageCount = Math.floor(bookCount / BOOKS_PR_PAGE) + 1;
  const pageIndexes = range(1, pageCount + 1);

  for (let pageIndex of pageIndexes) {
    const page = await api(BOOKS_PR_PAGE, pageIndex);
    if (addMissing(books, page)) {
      return books;
    }
  }
  return books;
};

const load = async (type, api) => {
  const books = await loadUntilCache(type, api);
  localStorage[type] = JSON.stringify(books);
  return books;
};

export const loadLibrary = () => load('library', fromLibrary);

export const loadAuthor = author => load(`author-${author}`, pageIndex => loadAuthor(author, pageIndex));
