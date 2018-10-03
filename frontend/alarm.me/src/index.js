import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import { history } from './history.js'
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render((
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
), document.getElementById('root'));

registerServiceWorker();
