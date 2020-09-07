import { React, get, set, on } from '../domdom';
import { Button, Cell, Grid, Progress } from '../components';
import fetchLibrary from '../api/from-library';
import fetchAuthor from '../api/by-author';
import { Author, Book, LibraryBook } from '../types';
import { save } from '../api/cache';

async function update() {
  set('update.step', 'library');
  set('update.library', 0);
  let res = await fetchLibrary(1);
  set('update.library', 1 / res.pageCount);

  const range = [...Array(res.pageCount).keys()];
  let done = 0;
  const library = await Promise.all(
    range.map(async page => {
      page += 2;
      res = await fetchLibrary(page);
      done++;
      set('update.library', done / res.pageCount);
      return res;
    })
  );

  const libraryBooks = library.flatMap(res => res.books);
  const authors = Array.from(
    new Set(libraryBooks.flatMap(book => book.authors))
  ).map(
    (name, id) =>
      ({
        id,
        name,
        progress: 0,
      } as Author)
  );
  set('update.authors', authors, 'id');

  const jobs: (() => Promise<void>)[] = [];
  const books: Book[] = [];

  let totalTotal = 0;
  let totalDone = 0;

  function updateTotalProgress() {
    totalDone++;
    set('update.total', {
      total: totalTotal,
      done: totalDone,
      progress: totalDone / totalTotal,
    });
  }

  function bumpAuthorProgress(id: number) {
    const key = `update.authors.${id}.progress`;
    let { done, total } = get(key);
    done++;
    set(`${key}.done`, done);
    set(`${key}.percentage`, done / total);
  }

  set('update.step', 'authors');
  for (const author of authors) {
    totalTotal++;
    jobs.push(async () => {
      const res = await fetchAuthor(author.name, 1);
      set(`update.authors.${author.id}.progress`, {
        done: 1,
        total: res.pageCount,
        percentage: 1 / res.pageCount,
      });
      books.push(...res.books);

      updateTotalProgress();
      for (let page = 2; page <= res.pageCount; page++) {
        totalTotal++;
        jobs.push(async () => {
          const res = await fetchAuthor(author.name, page);
          bumpAuthorProgress(author.id);
          updateTotalProgress();
          books.push(...res.books);
        });
      }
    });
  }

  async function runJob() {
    const job = jobs.shift();
    if (job) {
      await job();
      await runJob();
    }
  }

  const workers = [...Array(20).keys()];
  await Promise.all(workers.map(runJob));

  const libraryBooksMap = libraryBooks.reduce(
    (res: { [key: string]: LibraryBook }, book) => {
      res[book.id] = book;
      return res;
    },
    {}
  );

  for (let book of books) {
    const libraryBook = libraryBooksMap[book.id];
    if (libraryBook) {
      book.inLibrary = true;
      book.downloaded = libraryBook.downloaded;
    }
  }

  save(books);
  set('books', books, 'id');
  set('route', 'books');
}

export default () => (
  <div>
    <Button onClick={() => set('route', 'books')}>Books</Button>
    <Button onClick={update}>Update</Button>

    {on('update.step', step => {
      switch (step) {
        case 'library':
          return (
            <div>
              Library progress:
              <Progress path="update.library" determinate={true} />
            </div>
          );

        case 'authors':
          return (
            <div>
              <div>
                Total progress: {on('update.total.done')} /{' '}
                {on('update.total.total')} - last number will likely increase
                when authors are loaded
                <Progress path="update.total.progress" determinate={true} />
              </div>
              <Grid>
                {on<Author>('update.authors').map((author, { subPath }) => (
                  <Cell span={2}>
                    {author.name}
                    <Progress
                      path={subPath('progress.percentage')}
                      determinate={true}
                    />
                  </Cell>
                ))}
              </Grid>
            </div>
          );
      }
    })}
  </div>
);
