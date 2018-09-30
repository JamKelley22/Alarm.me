import React from 'react'
import PropTypes from 'prop-types'

import './util.scss'

const Button = (props) => {
  let btn;

  switch (props.size) {
    case 'small':
      btn = (
        <button
        onClick={props.onClick}
        className={'button buttonSmall'}>
          <span
          className='buttonText'>
            {props.name}
          </span>
        </button>
      )
      break;
    case 'medium':
      btn = (
        <button
        onClick={props.onClick}
        className={'button buttonMedium'}>
          <span
          className='buttonText'>
            {props.name}
          </span>
        </button>
      )
      break;
    case 'large':
      btn = (
        <button
          onClick={props.onClick}
          className={'button buttonLarge'}>
            <span
            className='buttonText'>
              {props.name}
            </span>
        </button>
      )
      break;
    default:
      btn = (
        <button
          onClick={props.onClick}
          className={'button'}>
            <span
            className='buttonText'>
              {props.name}
            </span>
        </button>
      )
      console.warn("Unknown Button Size: " + props.size);
  }

  return (
    btn
  );
}

export default Button;

Button.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Button.defaultProps = {
  name: 'Click Me',
  onClick: () => console.warn("Buttons need an onClick prop function!"),
  size: 'medium'
};
