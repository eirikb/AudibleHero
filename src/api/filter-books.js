export default (books, config = {}) => {

  const orderBy = config.orderBy || 'title';

  books = books
    .filter(book =>
      Object.entries(config.filter || {}).every(([prop, val]) =>
        book[prop] === val
      )
    )
    .sort((a, b) => (a[orderBy] || '').localeCompare(b[orderBy] || ''));

  return config.desc ? books.reverse() : books;
};