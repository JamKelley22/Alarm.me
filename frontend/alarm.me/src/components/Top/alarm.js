import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Mutation } from "react-apollo";

import { GET_ALARMS, DELETE_ALARM, CREATE_ALARM} from '../Util/gqlQueries.js'

const _updateStoreAfterDelete = (store, alarms, alarmId) => {
  const data = store.readQuery({ query: GET_ALARMS })
  let alarmIndex = data.alarms.findIndex(alarm => alarm.id === alarmId);
  let newAlarmData = data.alarms.splice(alarmIndex,1);
  data.alarmData = newAlarmData;
  store.writeQuery({ query: GET_ALARMS, data })
}

const Alarm = (props) => {
  return (
    <div className='alarm'>
      <div className='alarm__container'>
        <div className='alarm__info'>
          <span className='alarm__info__title'>{props.title}</span>
          <span className='alarm__info__note'>{props.note}</span>
        </div>

        <div className='alarm__time'>
          {moment(props.dateTime).format('LT')}
        </div>

        <div className='alarm__day'>
          {moment(props.dateTime).format('ddd')}
        </div>

        <div className='alarm__delete'>
          <Mutation
            mutation={DELETE_ALARM}
            update={(store, { data: { alarms } }) =>
              _updateStoreAfterDelete(store, alarms, props.id)
            }
          >
            {(deleteAlarm, { data }) => (
              <div>
                <FontAwesomeIcon
                className='fontawesome'
                icon='trash'
                onClick={() => {
                  deleteAlarm({ variables: { id: props.id } });
                }}
                />
              </div>
            )}
          </Mutation>

        </div>
      </div>
    </div>
  )
}

export default Alarm;

Alarm.propTypes = {
  name: PropTypes.string
};

Alarm.defaultProps = {
  name: 'Click Me'
};

/*
title={alarm.title}
note={alarm.note}
dateTime={alarm.dateTime}
color={alarm.color}



*/
