import Books from './Books';
import Update from './Update';
import { Domponent } from "@eirikb/domdom";

const app: Domponent = ({ when }) => <div>
  {when('route', [
    'books', () => <Books/>,
    'update', () => <Update/>
  ])}
</div>

export default app;