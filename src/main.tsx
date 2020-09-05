import { init, set } from './domdom';
import { load } from './api/cache';
import App from './views/App';
import './main.scss';

init(document.body, App);
set('route', 'books');
set('books', load());
