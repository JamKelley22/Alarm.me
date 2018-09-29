import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import { Account, Home, Landing, Navagation } from './components'
import * as routes from './constants/routes.js'
import Auth from './Auth/auth.js';
import { history } from './history';

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import './App.scss';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  state = {
    alarms: []
  }

  login = () => {
    const auth = new Auth();
    auth.login();
  }

  pushHistory = () => {
    history.push({ pathname: routes._HOME })
  }

  render() {


    return (
      <ApolloProvider client={client}>
      <div className="App">
        <Navagation/>
        <button onClick={this.login}>Login</button>
        <button onClick={this.pushHistory}>Push History</button>

        <Switch>
          <Route exact path={routes._LANDING} component={Landing}/>
          <Route exact path={routes._HOME} component={Home}/>
          <Route exact path={routes._ACCOUNT} component={Account}/>
        </Switch>
      </div>
    </ApolloProvider>
    );
  }
}

export default App;
