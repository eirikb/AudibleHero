import { React, on, get, set } from '../domdom';
import { Button, Grid, Cell } from '../components';
import { Book } from '../types';
import { load } from '../api/cache';

function clearFilter() {
  console.log(1);
}

function defaultFilter() {
  console.log(2);
}

function libraryFilter() {
  console.log(3);
}

set('books', load());
setVisibleBooks();

function setVisibleBooks(filter = '') {
  const r = new RegExp(filter, 'i');
  if (!get('books')) {
    console.log('no books');
    return;
  }
  const books = Object.values(get<{ [key: string]: Book }>('books'))
    .filter(b => b.title.match(r))
    .slice(0, 100);
  set('books2', books, 'id');
}

function setFilter(event: Event) {
  const { value } = event.target as HTMLInputElement;
  setVisibleBooks(value);
}

// function length(length) {
//   const hours = Math.floor(length / 60);
//   const minutes = length - 60 * hours;
//   return `${hours}h ${minutes}m`;
// }

export default () => (
  <Grid>
    <Cell span={2}>
      <Button onClick={() => set('route', 'update')}>Update</Button>
    </Cell>

    <Cell span={2}>
      <Button onClick={clearFilter}>Clear filter</Button>
    </Cell>

    <Cell span={2}>
      <Button onClick={defaultFilter}>Default filter</Button>
    </Cell>

    <Cell span={2}>
      <Button onClick={libraryFilter}>Library filter</Button>
    </Cell>

    <Cell span={4} />

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

    {on<Book>('books2').map(book => (
      <Cell span={2}>{book.title}</Cell>
    ))}
  </Grid>
);
