import { Button, Grid, Cell, Card } from '~components';

export default ({ on, get, set, unset }) => {
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
    const r = new RegExp(filter, 'i');
    const books = get('books').filter(b => b.title.match(r)).slice(0, 100);
    set('b', books);
  }

  function setFilter(event) {
    const { value } = event.target;
    setVisibleBooks(value);
  }

  function length(length) {
    const hours = Math.floor(length / 60);
    const minutes = length - 60 * hours;
    return `${hours}h ${minutes}m`;
  }

  return <Grid>
    <Cell span={2}>
      <Button onClick={() => set('route', 'update')}>Update</Button>
    </Cell>

    <Cell span="2">
      <Button onClick={clearFilter}>
        Clear filter
      </Button>
    </Cell>

    <Cell span="2">
      <Button onClick={defaultFilter}>
        Default filter
      </Button>
    </Cell>

    <Cell span="2">
      <Button onClick={libraryFilter}>
        Library filter
      </Button>
    </Cell>

    <Cell span="4"/>

    <Cell span="2">
      <div class="mdc-textfield">
        <input onInput={setFilter} type="text" class="mdc-textfield__input" placeholder="Search"/>
      </div>
    </Cell>

    <Cell span="12"/>

    {on('b', books => books.map(book =>
      <Cell span="2">
        <Card
          media={
            `https://images-na.ssl-images-amazon.com/images/I/${book.imageId}._SL160_.jpg`
          }
          title={
            book.title
          }
          subtitle={
            <div>
              {book.seriesBookIndex ?
                <span>
                    <span title="Series books index (could be decimal-based)">{book.seriesBookIndex}</span> /
                    <span title="Series max book index (highest number, not amount)">{book.seriesBookMaxIndex}</span>
                    <span
                      title="How many books in this series you have in your library">({book.seriesInLibraryCount || 0})</span>
                    <br/>
                  {book.seriesInLibrary ? <span>
                      You don't have this series in your library<br/>
                    </span> : ''}
                  </span>
                : ''}
              {book.inLibrary ? <span>Book is in your library<br/></span> : ''}
              Authors: {book.authors.join(',')}<br/>
              Release: {book.releaseDate}<br/>
              {!book.released ? <span> (not yet released)<br/></span> : ''}
              Language: {`${book.language}`}<br/>
              Rating: {book.rating}<br/>
              Length: {length(book.length)}<br/>
            </div>
          }
          actions={
            <div>This is actions</div>
          }
        />
      </Cell>
    ))}
  </Grid>;
};
