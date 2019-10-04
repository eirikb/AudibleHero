import { Button } from '~/components';

export default ({ set, when }) => () => <div>
  <Button onClick={() => set('route', 'books')}>Books</Button>
</div>
