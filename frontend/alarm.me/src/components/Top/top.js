import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { history, routes } from '../../history.js'
import Alarm from './alarm.js'
import { Util } from '../index.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment';
import { Query, Mutation } from "react-apollo";
import to from 'await-to-js';

import { GET_ALARMS, DELETE_ALARM, CREATE_ALARM, Form } from '../Util'
import { URI, USER_ID } from '../../constants'

import './top.scss'

let FormComponents = [
  {
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
  }
]

class Top extends React.Component {
  state = {
    alarmsExpanded: false,
    topSpacing: 'space-between',
    alarms: [],
    showCreateAlarmForm: false
  }

  signOut = () => {

  }

  componentDidMount = async() => {
    console.log("componentDidMount");
    console.log(this.state);
    let QUERY = `{
      alarms(userID: ${USER_ID}) {
        id
        userID
        dateTime
        title
        note
        color
      }
    }`

    //console.log(URI);
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
    console.log(data.data.alarms);
    this.setState({
      alarms: data.data.alarms
    })
  }

  openCreateAlarm = () => {
    this.setState({
      showCreateAlarmForm: true
    })
  }

  doCreateAlarm = async(values) => {
    //console.log(values);

    let dateTimeName = `${FormComponents[2].type}_${FormComponents[2].label}`
    let titleName = `${FormComponents[0].type}_${FormComponents[0].label}`
    let noteName = `${FormComponents[1].type}_${FormComponents[1].label}`
    let colorName //= `${FormComponents[2].type}_${FormComponents[2].label}`

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
          formComponents={FormComponents}
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


        <div>
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

            <Link
              to={routes._ACCOUNT}
              className='navagationLink'>
              Account
            </Link>

            <Util.Button
              name='Sign Out'
              size='small'
              onClick={() => this.signOut()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Top;


Top.propTypes = {
  showAlarms: PropTypes.bool
};

Alarm.defaultProps = {
  showAlarms: true
};
