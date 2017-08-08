export default (books, filter = {}) => {

  const limit = filter.limit || 10;
  const orderBy = filter.orderBy || 'title';

  books = books
    .filter(book => filter.inLibrary && filter.inLibrary === book.inLibrary || true)
    .sort((a, b) => (a[orderBy] || '').localeCompare(b[orderBy] || ''));

  books = filter.desc ? books.reverse() : books;
  return books.slice(0, limit);
};