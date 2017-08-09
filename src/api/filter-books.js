export default (books, config = {}) => {

  const limit = config.limit || 10;
  const orderBy = config.orderBy || 'title';

  books = books
    .filter(book =>
      Object.entries(config.filter || {}).every(([prop, val]) =>
        book[prop] === val
      )
    )
    .sort((a, b) => (a[orderBy] || '').localeCompare(b[orderBy] || ''));

  books = config.desc ? books.reverse() : books;
  return books.slice(0, limit);
};