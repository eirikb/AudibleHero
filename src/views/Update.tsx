import { React, set } from '../domdom';
import { Button } from '../components';

export default () => (
  <div>
    <Button onClick={() => set('route', 'books')}>Books</Button>
  </div>
);
