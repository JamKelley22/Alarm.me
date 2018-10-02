import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import to from 'await-to-js';

import { Account, Home, Landing, About, Error404 } from './components'
import * as routes from './constants/routes.js'
import Auth from './Auth/auth.js';
import { history } from './history';

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle, faTrash, faFeatherAlt, faUser, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { URI } from './constants/endpoints.js'

import './App.scss';

library.add(faPlusCircle, faTrash, faFeatherAlt, faUser, faCaretUp, faCaretDown);

const client = new ApolloClient({
  uri: URI
});

class App extends Component {
  state = {
    alarms: []
  }

  componentDidMount = async() => {
    let QUERY = `{
      alarms {
        id
        userID
        dateTime
        title
        note
        color
      }
    }`

    console.log(URI);
    let response, data, err;
    [ err, response ] = await to(fetch(URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({query: QUERY})
    }))
    if(err) {
      console.error(err);
      return;
    }
    [ err, data ] = await to(response.json());
    if(err) {
      console.error(err);
      return;
    }
    console.log(data);
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
          <Switch>
            <Route exact path={routes._LANDING} component={Landing}/>
            <Route exact path={routes._HOME} component={Home}/>
            <Route exact path={routes._ACCOUNT} component={Account}/>
            <Route exact path={routes._ABOUT} component={About}/>
            <Route component={() => <Error404/>} />
          </Switch>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
