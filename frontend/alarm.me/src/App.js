import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import { Account, Home, Landing, Navagation } from './components'
import * as routes from './constants/routes.js'

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navagation/>
        <Switch>
          <Route exact path={routes._LANDING} component={Landing}/>
          <Route exact path={routes._HOME} component={Home}/>
          <Route exact path={routes._ACCOUNT} component={Account}/>
        </Switch>
      </div>
    );
  }
}

export default App;
