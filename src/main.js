import domdom from '@eirikb/domdom';
import App from './views/App.jsx';
import './main.scss';

const dd = domdom();
dd.append(document.body, App);
