import React from 'react'
import PropTypes from 'prop-types'

const SecondsBar = (props) => {
  let percent = (props.numSeconds / 60) * 100;
  let divStyle = {
    width: `${percent}%`
  }
  return (
    <div className="progressPar" style={divStyle}/>
  )
}

export default SecondsBar;

SecondsBar.propTypes = {
  numSeconds: PropTypes.number
};

SecondsBar.defaultProps = {
  numSeconds: 0
};
