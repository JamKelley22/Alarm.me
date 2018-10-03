import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
          <div>
            <FontAwesomeIcon
            className='fontawesome__trash'
            icon='trash'
            onClick={props.deleteAlarm}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Alarm;

Alarm.propTypes = {
  title: PropTypes.string,
  note: PropTypes.string,
  dateTime: PropTypes.string,
  color: PropTypes.string,
};

Alarm.defaultProps = {
  title: 'Title',
  note: 'Note',
  dateTime: 'Today',
  color: 'red'
};
