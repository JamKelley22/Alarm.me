import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom'
import { history } from './history.js'

ReactDOM.render((
  <BrowserRouter history={history}>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
