import Books from './Books';
import Update from './Update';

export default ({ when }) => <div>
  {when('route', [
    'books', () => <Books/>,
    'update', () => <Update/>
  ])}
</div>