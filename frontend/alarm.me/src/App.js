import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import to from 'await-to-js';
import moment from 'moment'

import { Account, Home, Landing, About, Login, Signup, Error404 } from './components'
import * as routes from './constants/routes.js'
import { history } from './history';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPlusCircle, faTrash, faFeatherAlt, faUser, faCaretDown, faEdit } from '@fortawesome/free-solid-svg-icons'

import { URI, USER_ID, GET_ALARMS } from './constants'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import * as stuffActions from './actions/stuffActions.js';

import './App.scss';

library.add(fab, faPlusCircle, faTrash, faFeatherAlt, faUser, faCaretDown, faEdit);

const ONE_SECOND = 1000;

const getCurrentSeconds = () => {
  return parseInt(moment().format('s'));
}

const isSameMomentAsNow = (dateTime) => {
  return moment(moment().format('LLLL')).isSame(moment(dateTime).format('LLLL'));
}

class App extends Component {
  state = {
    alarms: [],
    checkAlarmInterval: null,
    appFlashOn: false
  }

  startIntervalAtTopOfMinute = () => {
    let currSeconds = getCurrentSeconds();
    if(currSeconds === 0) {
      this.checkAlarms();
      let checkAlarmInterval = setInterval(this.checkAlarms,ONE_SECOND * 60);
      this.setState({
        checkAlarmInterval: checkAlarmInterval
      })
    }
    else {
      setTimeout(this.startIntervalAtTopOfMinute,ONE_SECOND);
    }
  }

  checkAlarms = async() => {
    //console.log("checkAlarms");
    await this.updateAlarmListFromServer();
    this.state.alarms.forEach((alarm, i) => {
      if(isSameMomentAsNow(alarm.dateTime)) {
        this.playAlarm(alarm);
      }
    })
  }

  playAlarm = (alarm) => {
    this.setState({
      appFlashOn: !this.state.appFlashOn
    }, () => {
      setTimeout(this.playAlarm,ONE_SECOND * 2);
    })
  }

  updateAlarmListFromServer = async() => {
    //Only necessary b/c were not using redux yet
    let response, data, err;
    [ err, response ] = await to(fetch(URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({query: GET_ALARMS})
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
    this.setState({
      alarms: data.data.alarms
    })
  }

  componentDidMount = () => {
    //Currently checking alarms every minute to see if they are going to go off
    //May update to creating timeouts for every alarm
    this.startIntervalAtTopOfMinute();
    this.updateAlarmListFromServer();
    //setInterval(this.checkAlarms,ONE_SECOND * 5)
  }

  componetWillUnmount = () => {
    clearInterval(this.state.checkAlarmInterval);
  }

  pushHistory = () => {
    history.push({ pathname: routes._HOME })
  }

  renderData() {
    return <div>{this.props.stuffs}</div>;
  }

  render() {
    return (
      <div className={`App ${this.state.appFlashOn && 'appFlashOn'}`}>
        <Switch>
          <Route exact path={routes._LANDING} component={Landing}/>
          <Route exact path={routes._HOME} component={Home}/>
          <Route exact path={routes._LOGIN} component={Login}/>
          <Route exact path={routes._SIGNUP} component={Signup}/>
          <Route exact path={routes._ACCOUNT} component={Account}/>
          <Route exact path={routes._ABOUT} component={About}/>
          <Route component={() => <Error404/>} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  }
}

export default withRouter(connect(mapStateToProps)(App))
