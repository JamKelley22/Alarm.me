import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import { Account, Home, Landing, Navagation } from './components'
import * as routes from './constants/routes.js'
import Auth from './Auth/auth.js';
import { history } from './history';

import { createApolloFetch } from 'apollo-fetch';
import moment from 'moment';

import './App.scss';

class App extends Component {
  state = {
    alarms: []
  }

  componentDidMount() {
    this.getData();
  }

  login = () => {
    const auth = new Auth();
    auth.login();
  }

  pushHistory = () => {
    history.push({ pathname: routes._HOME })
  }

  getData = async() => {
    const fetch = createApolloFetch({
      uri: 'http://localhost:4000/graphql',
    });

    let response = await fetch({
      query: `{
        alarms(userID: 1) {
          id
          title
          note
          dateTime
          userID
        }
      }`,
    });

    this.setState({
      alarms: response.data.alarms
    })

    response.data.alarms.forEach(alarm => {
      console.log(alarm);
    })
  }

  render() {
    return (
      <div className="App">
        <Navagation/>
        <button onClick={this.login}>Login</button>
        <button onClick={this.pushHistory}>Push History</button>
        <button onClick={this.getData}>Data</button>
        <h1>Alarms</h1>
        {
          this.state.alarms.map((alarm, i) => {
            return(
              <div key={i}>
                {i+1}. <h3>{alarm.title}</h3>
                <p>{alarm.note}</p>
                <p>{alarm.dateTime}</p>
              </div>
            );
          })
        }
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
