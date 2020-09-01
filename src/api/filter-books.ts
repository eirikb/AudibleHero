import { Book, FilterConfig } from 'types.d.ts';

export default (
  books: Book[],
  config: FilterConfig
  // = {
  //   desc: '',
  //   filter: '',
  //   orderBy: 'title',
  //   textFilter: '',
  // }
) => {
  const orderBy = config.orderBy;
  const textFilter = config.textFilter
    ? new RegExp(config.textFilter, 'i')
    : null;

  books = books
    .filter(book =>
      Object.entries(config.filter || {}).every(
        ([prop, val]) =>
          typeof val === 'undefined' || (book as any)[prop] === val
      )
    )
    .sort((a, b) => {
      const fieldA: string | number = (a as any)[orderBy] || '';
      const fieldB: string | number = (b as any)[orderBy] || '';

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return fieldA.localeCompare(fieldB);
      }

      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return fieldA - fieldB;
      }

      return 0;
    });

  if (textFilter) {
    books = books.filter(book =>
      Object.values(book).some(val => textFilter.exec(val))
    );
  }

  return config.desc ? books.reverse() : books;
};
