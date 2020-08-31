import { on, set } from './domdom';
// import { uniq, flatten, range } from 'lodash';
// import { getBooks, updateFromLibrary, updateByAuthor } from './api';
import { load } from './api/cache';

export default () => {
  set('route', 'books');

  on('+* status', console.log);
  on('+* progressLibrary', console.log);
  on('+* progressAuthor', console.log);
  on('+* progressAllAuthors', console.log);

  set('books', load());

  // const p = (pos: number, tot: number) => Math.floor((pos / tot) * 100);

  on('= update', () => {
    set('status', 'resetProgress');
    set('status', 'startProgress');
    // return updateFromLibrary((pos, tot) =>
    //   set('progressLibrary', p(pos, tot))
    // ).then(async books => {
    //   set('progressLibrary', 100);
    //   const authors = uniq(flatten(books.map(book => book.authors)));
    //
    //   set(
    //     'progressAuthors',
    //     authors.reduce((res, author) => {
    //       res[author] = 0;
    //       return res;
    //     }, {})
    //   );
    //
    //   let authorsDone = 0;
    //   const authorsCount = authors.length;
    //   await Promise.all(
    //     range(0, 10).map(async () => {
    //       let author;
    //       while (!!(author = authors.pop())) {
    //         await updateByAuthor(author, (pos, tot) =>
    //           set('progressAuthor', {
    //             author,
    //             progress: p(pos, tot),
    //           })
    //         );
    //         authorsDone++;
    //         set(
    //           'progressAllAuthors',
    //           Math.floor((authorsDone / authorsCount) * 100)
    //         );
    //       }
    //     })
    //   );
    //   save();
    // });
  });
};
