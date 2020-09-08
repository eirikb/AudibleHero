import { Book, FilterConfig } from '../types';

export default (books: Book[], config: FilterConfig) => {
  const orderBy = config.orderBy;
  const textFilter = config.textFilter
    ? new RegExp(config.textFilter, 'i')
    : null;

  books = books
    .filter(book => {
      for (const [key, value] of Object.entries(config.filter)) {
        if (value !== null) {
          if ((book as any)[key] !== value) return false;
        }
      }
      if (textFilter) {
        if (textFilter.exec(JSON.stringify(book))) {
          return true;
        }
      } else {
        return true;
      }
      return false;
    })
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

  return config.desc ? books.reverse() : books;
};
