import domdom from '@eirikb/domdom';
import App from './views/App';
import data from './data';
import './main.scss';

const dd = domdom(document.body, App);
data(dd);
