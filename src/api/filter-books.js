export default (books, filter = {}) => {

  const limit = filter.limit || 10;

  return books.slice(0, limit);
};