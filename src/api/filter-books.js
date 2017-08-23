export default (books, config = {}) => {

  const orderBy = config.orderBy || 'title';

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

  return config.desc ? books.reverse() : books;
};