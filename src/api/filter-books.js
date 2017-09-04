export default (books, config = {}) => {

  const orderBy = config.orderBy || 'title';
  const textFilter = config.textFilter ? new RegExp(config.textFilter, 'i') : null;

  books = books
    .filter(book =>
      Object.entries(config.filter || {}).every(([prop, val]) =>
        typeof val === 'undefined' || book[prop] === val
      )
    )
    .sort((a, b) => {
      a = a[orderBy] || '';
      b = b[orderBy] || '';

      if (isNaN(a) || isNaN(b)) return a.localeCompare(b);
      return a - b;
    });

  if (textFilter) {
    books = books.filter(book => Object.values(book).some(val => textFilter.exec(val)));
  }

  return config.desc ? books.reverse() : books;
};