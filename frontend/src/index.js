import React from 'react';
import ReactDOM from 'react-dom';
import InsightApp from './InsightApp';
import { setDefaultLanguage } from './utils/i18n';
import * as serviceWorker from './serviceWorker';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

setDefaultLanguage();

ReactDOM.render(<InsightApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
