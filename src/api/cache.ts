import { compress, decompress } from 'lz-string';
import { Book } from 'types';

const version = require('../../package.json').version;

interface Cache {
  version: string;
  books: Book[];
}

export const load = (): Book[] | undefined => {
  try {
    const cache = JSON.parse(
      decompress(localStorage.audibleherocache) || ''
    ) as Cache;
    if (cache.version === version) return cache.books;
  } catch (e) {}
  return;
};

export const save = (books: Book[]) => {
  const cache = {
    version,
    books,
  } as Cache;
  localStorage.audibleherocache = compress(JSON.stringify(cache));
};
