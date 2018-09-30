import React from 'react'
import PropTypes from 'prop-types'

import './util.scss'

const Button = (props) => {
  return (
    <button
    onClick={props.onClick}
    className={'button'}>
      <span
      className='buttonText'>
        {props.name}
      </span>
    </button>
  );
}

export default Button;

Button.propTypes = {
  name: PropTypes.string
};

Button.defaultProps = {
  name: 'Click Me'
};
