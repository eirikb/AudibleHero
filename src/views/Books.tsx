import { React, on, set } from '../domdom';
import { Button, Grid, Cell } from '../components';

console.log(1);
on('!+* books.*', b => {
  console.log(b);
});

function clearFilter() {
  console.log(1);
}

function defaultFilter() {
  console.log(2);
}

function libraryFilter() {
  console.log(3);
}

setVisibleBooks();

function setVisibleBooks(filter = '') {
  console.log('filter', filter);
  // const r = new RegExp(filter, 'i');
  // const books = get('books').filter(b => b.title.match(r)).slice(0, 100);
  // set('b', books);
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
  </Grid>
);
