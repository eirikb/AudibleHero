import domdom from '@eirikb/domdom';
import App from './views/App.jsx';
import data from './data';
import './main.scss';

const dd = domdom();
data(dd);
dd.append(document.body, App);
