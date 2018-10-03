import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { history, routes } from '../../history.js'
import * as ACTION from '../../actions/actionTypes.js'
import Alarm from './alarm.js'
import { Util } from '../index.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment';
import { Query, Mutation } from "react-apollo";
import to from 'await-to-js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import update from 'immutability-helper';

import { Form } from '../Util'
import { URI, USER_ID, GET_ALARMS, DELETE_ALARM, CREATE_ALARM, UPDATE_ALARM } from '../../constants'

import './top.scss'

let CreateAlarmFormComponents = () =>
[{
    type: 'input',
    label: 'Title',
    placeholder: 'Class'
  },
  {
    type: 'input',
    label: 'Note',
    placeholder: '8 AM'
  },
  {
    type: 'dateTime',
    label: 'Date/Time',
    placeholder: 'Click to Enter'
  }]

let UpdateAlarmFormComponents = (alarm) =>
    [{
      type: 'input',
      label: 'Title',
      placeholder: `${alarm.title}`
    },
    {
      type: 'input',
      label: 'Note',
      placeholder: `${alarm.note}`
    },
    {
      type: 'dateTime',
      label: 'Date/Time',
      placeholder: moment(`${alarm.dateTime}`).format('LLL')
    }]

let PlaceholderAlarm = {
  title: "Title",
  note: "Note",
  placeholder: moment()
}

class Top extends React.Component {
  state = {
    alarmsExpanded: false,
    topSpacing: 'space-between',
    alarms: [],
    showCreateAlarmForm: false,
    showUpdateAlarmForm: false,
    currAlarmEditing: PlaceholderAlarm
  }

  signOut = () => {

  }

  componentDidMount = () => {
    this.doGetAlarms();
  }

  doGetAlarms = async() => {
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
    console.log(data.data.alarms);
    this.setState({
      alarms: data.data.alarms
    })
  }

  openCreateAlarm = () => {
    this.setState({
      showCreateAlarmForm: true,
      showUpdateAlarmForm: false
    })
  }

  openUpdateAlarm = (alarm) => {
    this.setState({
      showCreateAlarmForm: false,
      showUpdateAlarmForm: true,//only one showing at a time
      currAlarmEditing: alarm
    })
  }

  doCreateAlarm = async(values) => {
    let dateTimeName = `${CreateAlarmFormComponents()[2].type}_${CreateAlarmFormComponents()[2].label}`
    let titleName = `${CreateAlarmFormComponents()[0].type}_${CreateAlarmFormComponents()[0].label}`
    let noteName = `${CreateAlarmFormComponents()[1].type}_${CreateAlarmFormComponents()[1].label}`
    let colorName //= `${CreateAlarmFormComponents()[2].type}_${CreateAlarmFormComponents()[2].label}`

    let dateTimeIndex = 2
    let titleIndex = 0
    let noteIndex = 1
    let colorIndex

    let dateTimeObj = values[dateTimeIndex]
    let titleObj = values[titleIndex]
    let noteObj = values[noteIndex]
    let colorObj

    let newAlarm;
    let response, data, err;
    [ err, response ] = await to(fetch(URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: CREATE_ALARM,
        variables: { userID: USER_ID, dateTime: `${dateTimeObj[dateTimeName]}`, title: `${titleObj[titleName]}`, note: `${noteObj[noteName]}`, color: `red` },
      })
    }))
    if(err) {
      console.error(err);
      return;
    }
    [ err, data ] = await to(response.json());
    //console.log(data);
    if(err) {
      console.error(err);
      return;
    }
    else {
      console.log(data.data.createAlarm);
      this.setState({
        alarms: [...this.state.alarms, data.data.createAlarm]
      })
    }
  }

  deleteAlarm = async(alarmID) => {
    let response, data, err;
    [ err, response ] = await to(fetch(URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: DELETE_ALARM,
        variables: { userID: USER_ID, id: alarmID},
      })
    }))
    if(err) {
      console.error(err);
      return;
    }
    [ err, data ] = await to(response.json());
    //console.log(data);
    if(err) {
      console.error(err);
      return;
    }
    else {
      if(data.data) {
        this.setState({
          alarms: this.state.alarms.filter(alarm => data.data.deleteAlarm.id !== alarm.id)
        })
      }
      else {
        alert("Problem deleting alarm");
      }
    }
  }

  doUpdateAlarm = async(values) => {
    let UpdateForm = UpdateAlarmFormComponents(this.state.currAlarmEditing);

    let dateTimeName = `${UpdateForm[2].type}_${UpdateForm[2].label}`
    let titleName = `${UpdateForm[0].type}_${UpdateForm[0].label}`
    let noteName = `${UpdateForm[1].type}_${UpdateForm[1].label}`
    let colorName //= `${UpdateForm()[2].type}_${UpdateForm()[2].label}`

    let dateTimeIndex = 2
    let titleIndex = 0
    let noteIndex = 1
    let colorIndex

    let dateTimeObj = values[dateTimeIndex]
    let titleObj = values[titleIndex]
    let noteObj = values[noteIndex]
    let colorObj


    let response, data, err;
    [ err, response ] = await to(fetch(URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: UPDATE_ALARM,
        variables: { userID: USER_ID, id: this.state.currAlarmEditing.id, dateTime: `${dateTimeObj[dateTimeName]}`, title: `${titleObj[titleName]}`, note: `${noteObj[noteName]}`, color: `red` },
      })
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
    else {
      //UPDATE ALARM LOCALLY HERE
      //TAKING A SHORTCUT FOR NOW AND JUST REFETCHING THE DATA

      this.doGetAlarms();

      /*
      if(data.data) {
        console.log("HERE");
        console.log(this.state.alarms);
        let alarmIndex = this.state.alarms.findIndex(alarm => data.data.updateAlarm.id === alarm.id);
        let updatedAlarms;

        updatedAlarms = update(this.state.alarms, {
          x: {y: {z: {$set: 7}}},
        });

        console.log(updatedAlarms);
      }
      else {
        alert("Problem deleting alarm");
      }
      */

    }
  }

  render () {
    let AlarmList;
    if(this.state.alarmsExpanded && this.props.showAlarms) {
      if(this.state.alarms) {
        AlarmList = this.state.alarms.map((alarm,i) => {
          return (
            <div
            key={i}>
              <Alarm
                title={alarm.title}
                note={alarm.note}
                dateTime={alarm.dateTime}
                color={alarm.color}
                id={alarm.id}
                deleteAlarm={() => this.deleteAlarm(alarm.id)}
                onEditAlarm={() => this.openUpdateAlarm(alarm)}
              />
              <hr/>
            </div>
          );
        })
      }
    }
    return (
      <div className='topLine'>
        <Form
          title='Create New Alarm'
          show={this.state.showCreateAlarmForm}
          type='modalForm'
          onCancel={() => this.setState({showCreateAlarmForm: false})}
          onConfirm={(values) => {this.doCreateAlarm(values); this.setState({showCreateAlarmForm: false})}}
          formComponents={() => CreateAlarmFormComponents()}
        />

        <Form
          title='Update Alarm'
          show={this.state.showUpdateAlarmForm}
          type='modalForm'
          onCancel={() => this.setState({showUpdateAlarmForm: false})}
          onConfirm={(values) => {this.doUpdateAlarm(values); this.setState({showUpdateAlarmForm: false})}}
          formComponents={() => UpdateAlarmFormComponents(this.state.currAlarmEditing)}
        />

        {
          (this.props.showAlarms)
          ?
          <div className={(this.state.alarmsExpanded) ? 'area alarmArea alarmArea--expanded' : 'area alarmArea'}>
            <div className='allAlarms'>
              {AlarmList}
            </div>
            <div
            onClick={() => this.setState({alarmsExpanded: !this.state.alarmsExpanded})}
            className='alarmsLabel'>
              {
                this.state.alarmsExpanded && <hr/>
              }
              <span>Alarms</span>
              <FontAwesomeIcon className='fontawesome' icon='caret-down' />


            </div>
            <div>
              <FontAwesomeIcon
                className='fontawesome plusCircle'
                icon='plus-circle'
                onClick={() => {
                  this.openCreateAlarm();
                }}
              />
            </div>
          </div>
          :
          <div style={{width: '250px'}}/>
        }


        <div className='appNameAreaContainer'>
          <div className='area appNameArea' onClick={() => history.push(routes._LANDING)}>
            <span className='appName'>Alarm.Me</span>
          </div>
        </div>

        <div>
          <div className='area navagationArea'>
            <Link
              to={routes._HOME}
              className='navagationLink'>
              Home
            </Link>

            <Link
              to={routes._ABOUT}
              className='navagationLink'>
              About
            </Link>

            {/* ======Not Yet Implimented======
            <Link
              to={routes._ACCOUNT}
              className='navagationLink'>
              Account
            </Link>

            <Util.Button
              name='Sign Out'
              size='small'
              onClick={() => this.signOut()}
            />*/}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    alarms: state.alarms
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteAlarm: (item) => {
      dispatch({type: ACTION.DELETE_ALARM, payload: item})
    },
    addAlarm: (item) => {
      dispatch({type: ACTION.ADD_ALARM, payload: item})
    },
    updateAlarm: (item) => {
      dispatch({type: ACTION.UPDATE_ALARM, payload: item})
    },
  };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Top))


Top.propTypes = {
  showAlarms: PropTypes.bool
};

Alarm.defaultProps = {
  showAlarms: true
};
