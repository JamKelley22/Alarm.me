import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { history, routes } from '../../history.js'
import Alarm from './alarm.js'
import { Util } from '../index.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment';
import { Query, Mutation } from "react-apollo";

import { GET_ALARMS, DELETE_ALARM, CREATE_ALARM} from '../Util/gqlQueries.js'

import './top.scss'

class Top extends React.Component {
  state = {
    alarmsExpanded: false,
    topSpacing: 'space-between'
  }

  signOut = () => {

  }

  render () {

    let AlarmList;
    if(this.state.alarmsExpanded && this.props.showAlarms) {
      AlarmList = (
        <Query
          query={GET_ALARMS}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.alarms.map((alarm, i) => (
              <div
              key={i}>
                <Alarm
                  title={alarm.title}
                  note={alarm.note}
                  dateTime={alarm.dateTime}
                  color={alarm.color}
                  id={alarm.id}
                />
                <hr/>
              </div>
            ));
          }}
        </Query>
      )
    }

    return (
      <div className='topLine'>
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
            <Mutation
              mutation={CREATE_ALARM}
              update={(store, { data: { createAlarm } }) => {
                const { alarms } = store.readQuery({ query: GET_ALARMS });
                store.writeQuery({
                  query: GET_ALARMS,
                  data: { alarms: alarms.concat([createAlarm]) }
                });
              }}
            >
              {(createAlarm, { data }) => (
                <div>
                  <FontAwesomeIcon
                    className='fontawesome plusCircle'
                    icon='plus-circle'
                    onClick={() => {
                      createAlarm({ variables: { userID: 1, dateTime: "2010-10-20 4:30", title: "Test", note: "note", color: "green" } });
                    }}
                  />
                </div>
              )}
            </Mutation>
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
