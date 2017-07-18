import fromLibrary from './from-library';
import {range, some} from 'lodash';

const loadCache = name => {
  try {
    return JSON.parse(localStorage[name]);
  } catch (ignored) {
    return null;
  }
}

const addMissing = (books, page) => {
  return !page.books.every(book => {
    const newBook = !some(books, book);
    if (newBook) {
      books.push(book);
    }
    return newBook;
  });
}

const loadUntilCache = async (type, api) => {
  const books = loadCache(type) || [];
  const first = await api(1, 1);
  if (addMissing(books, first)) {
    return books;
  }
  const bookCount = first.pageCount + 1;
  const pageCount = Math.floor(bookCount / 50) + 1;
  const pageIndexes = range(1, pageCount + 1);

  for (let pageIndex of pageIndexes) {
    const page = await api(50, pageIndex);
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
