import { React, on, get, set } from '../domdom';
import {
  Button,
  Grid,
  Cell,
  Card,
  ButtonLink,
  Select,
  Switch,
} from '../components';
import { Book, FilterConfig, ViewConfig } from '../types';
import { load } from '../api/cache';
import filterBooks from '../api/filter-books';

const defaultFilter: FilterConfig = {
  inLibrary: false,
  seriesInLibrary: true,
  language: 'en',
  seriesBookIndexInLibrary: false,
};

const defaultConfig: ViewConfig = {
  orderBy: 'releaseDate',
  desc: true,
  textFilter: '',
  filter: defaultFilter,
};

set('viewconfig', defaultConfig);

resetFilter();
set('books', load());
setVisibleBooks();

on('- viewconfig', () => {
  setVisibleBooks();
}).listen();
on('+* viewconfig.*', () => {
  setVisibleBooks();
}).listen();
on('+* viewconfig.filter.*', () => {
  setVisibleBooks();
}).listen();

// domdom doesn't support .slice yet. Crazy, I know
function setVisibleBooks() {
  if (!get('books')) return;

  const filter = get<ViewConfig>('viewconfig');
  const books = filterBooks(
    Object.values(get<{ [key: string]: Book }>('books')),
    filter
  ).slice(0, 100);
  set('books2', books);
}

function setFilter(event: Event) {
  const { value } = event.target as HTMLInputElement;
  set('viewconfig.textFilter', value);
}

function clearFilter() {
  set('viewconfig.filter', {});
}

function resetFilter() {
  set('viewconfig.filter', defaultFilter);
}

function libraryFilter() {
  set('viewconfig.filter', {
    inLibrary: true,
  });
}

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
        <Cell span={12}>
          <Button onClick={() => set('route', 'update')}>Update</Button>
        </Cell>

        <Cell span={12}>
          <Grid>
            <Cell span={2}>
              <Select<string>
                label="Order by"
                model="viewconfig.orderBy"
                options={[
                  { label: 'Release date', value: 'releaseDate' },
                  {
                    label: 'Length',
                    value: 'length',
                  },
                ]}
              />
            </Cell>

            <Cell span={2}>
              <Switch label="Descending" model="viewconfig.desc" />
            </Cell>
          </Grid>
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
          <Select<boolean | null>
            label="Library"
            model="viewconfig.filter.inLibrary"
            options={[
              { label: '', value: null },
              {
                label: 'In library',
                value: true,
              },
              { label: 'Not in library', value: false },
            ]}
          />
        </Cell>

        <Cell span={2}>
          <Select<boolean | null>
            label="Series in library"
            model="viewconfig.filter.seriesInLibrary"
            options={[
              { label: '', value: null },
              {
                label: 'Series in library',
                value: true,
              },
              { label: 'Series not in library', value: false },
            ]}
          />
        </Cell>

        <Cell span={2}>
          <Select<string | null>
            label="Language"
            model="viewconfig.filter.language"
            options={[
              { label: '', value: null },
              {
                label: 'en',
                value: 'en',
              },
            ]}
          />
        </Cell>

        <Cell span={2}>
          <Select<boolean | null>
            label="Series book in library"
            model="viewconfig.filter.seriesBookIndexInLibrary"
            options={[
              { label: '', value: null },
              {
                label: 'Series book in library',
                value: true,
              },
              {
                label: 'Series book not in library',
                value: false,
              },
            ]}
          />
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
                ({book.seriesInLibraryCount || 0})
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
          Length: {length(book.length)} ( {book.length})
        </Card>
      </Cell>
    ))}
  </Grid>
);
