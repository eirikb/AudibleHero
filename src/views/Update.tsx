import { Button } from '../components';
import { Domponent } from "@eirikb/domdom";

const update : Domponent = ({set}) =>  <div>
  <Button onClick={() => set('route', 'books')}>Books</Button>
</div>

export default update;
