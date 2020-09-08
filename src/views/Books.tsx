import { React, on, get, set, unset } from '../domdom';
import { Button, Grid, Cell, Card, ButtonLink } from '../components';
import { Book, FilterConfig } from '../types';
import { load } from '../api/cache';
import filterBooks from '../api/filter-books';

const defaultFilter: FilterConfig = {
  orderBy: 'releaseDate',
  desc: true,
  textFilter: '',
  filter: {
    inLibrary: false,
    released: true,
    seriesInLibrary: true,
    language: 'en',
    seriesBookIndexInLibrary: false,
    ignore: false,
  },
};

resetFilter();
set('books', load());
setVisibleBooks();

on('!+* filter.**', filter => {
  console.log('FILTER CHANGED! :O', filter);
});

// domdom doesn't support .slice yet. Crazy, I know
function setVisibleBooks(text = '') {
  if (!get('books')) return;

  const filter = get<FilterConfig>('filter');
  filter.textFilter = text;
  const books = filterBooks(
    Object.values(get<{ [key: string]: Book }>('books')),
    filter
  ).slice(0, 100);
  set('books2', books, 'id');
}

function setFilter(event: Event) {
  const { value } = event.target as HTMLInputElement;
  setVisibleBooks(value);
}

function clearFilter() {
  unset('filter');
}

function resetFilter() {
  set('filter', defaultFilter);
}

function libraryFilter() {}

function length(length: number) {
  const hours = Math.floor(length / 60);
  const minutes = length - 60 * hours;
  return `${hours}h ${minutes}m`;
}

function released(book: Book) {
  const date = book.releaseDate.split('-').map(p => parseInt(p));
  return new Date() > new Date(date[0], date[1] - 1, date[2]);
}

export default () => (
  <Grid>
    <Cell span={12}>
      <Grid>
        <Cell span={2}>
          <Button onClick={() => set('route', 'update')}>Update</Button>
        </Cell>

        <Cell span={2}>
          <Button onClick={clearFilter}>Clear filter</Button>
        </Cell>

        <Cell span={2}>
          <Button onClick={resetFilter}>Default filter</Button>
        </Cell>

        <Cell span={2}>
          <Button onClick={libraryFilter}>Library filter</Button>
        </Cell>

        <Cell span={2}>
          <div class="mdc-textfield">
            <input
              onInput={setFilter}
              type="text"
              class="mdc-textfield__input"
              placeholder="Search"
            />
          </div>
        </Cell>
      </Grid>
    </Cell>

    {on<Book>('books2').map(book => (
      <Cell span={2}>
        <Card
          title={book.title}
          linkUrl={`/pd/${book.id}`}
          subTitle={book.seriesName}
          actions={[
            <ButtonLink title="Book" target="_blank" url={`/pd/${book.id}`} />,
            <ButtonLink
              title="Series"
              target="_blank"
              url={`/series?asin=${book.seriesId}`}
            />,
          ]}
          imageUrl={`https://images-na.ssl-images-amazon.com/images/I/${book.imageId}._SL160_.jpg`}
        >
          {book.seriesBookIndex ? (
            <span>
              <span title="Series books index (could be decimal-based)">
                {book.seriesBookIndex}
              </span>{' '}
              /
              <span title="Series max book index (highest number, not amount)">
                {book.seriesBookMaxIndex}
              </span>
              <span title="How many books in this series you have in your library">
                {book.seriesInLibraryCount || 0}
              </span>
              <br />
            </span>
          ) : null}
          {!book.seriesInLibraryCount ? (
            <span>
              You don't have this series in your library
              <br />
            </span>
          ) : null}
          {book.inLibrary ? (
            <span>
              Book is in your library <br />
            </span>
          ) : null}
          Authors: {Object.values(book.authors).join(',')}
          <br />
          Release: {book.releaseDate}
          {released(book) ? (
            <span>
              {' '}
              (not yet released)
              <br />
            </span>
          ) : null}
          Language: {book.language}
          <br />
          Rating: {book.rating}
          <br />
          Length: {length(book.length)}
        </Card>
      </Cell>
    ))}
  </Grid>
);
