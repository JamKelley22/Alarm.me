import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import * as routes from '../../constants/routes.js'

import './navagation.scss'

class Navagation extends React.Component {
  render () {
    return (
      <div className='navagationBar'>
        <Link to={routes._HOME}>Home</Link>
        <Link to={routes._ACCOUNT}>Account</Link>
      </div>
    );
  }
}

export default Navagation;
