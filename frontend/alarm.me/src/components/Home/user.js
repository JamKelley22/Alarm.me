import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const User = (props) => {
  return (
    <div className='user'>
      <div className='user__upper'>
        <div className='user__upper__circle'>
          <FontAwesomeIcon
            className='fontawesome__user'
            icon='user'
          />
        </div>
      </div>
      <div className='user__lower'>
        {props.username}
      </div>
    </div>
  )
}

export default User;

User.propTypes = {
  username: PropTypes.string
};

User.defaultProps = {
  username: 'Larry Bob'
};
