export default (books, filter = {}) => {

  const limit = filter.limit || 10;
  const orderBy = filter.orderBy || 'title';

  books = books
    .filter(book => filter.inLibrary && filter.inLibrary === book.inLibrary || true)
    .sort((a, b) => (a[orderBy] || '').localeCompare(b[orderBy] || ''));

  return filter.desc ? books.reverse() : books;
};