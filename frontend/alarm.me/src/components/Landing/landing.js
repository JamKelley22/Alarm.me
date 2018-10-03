import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Util } from '../index.js'
import { history, routes } from '../../history.js'

import LeftSVG from '../../Images/SVG/left.svg'
import RightSVG from '../../Images/SVG/right.svg'
import './landing.scss'

class Landing extends React.Component {

  render () {
    return (
      <div className='landing'>
        <img src={LeftSVG} className='svg leftSVG' alt='Left Backround SVG'/>
        <img src={RightSVG} className='svg rightSVG' alt='Right Backround SVG'/>
        <div className='landing__row1 landing__row' >
          <FontAwesomeIcon
            className='fontawesome__feather'
            icon='feather-alt'
          />
        </div>
        <div className='landing__row2 landing__row'>
          <span className='appname'>Alarm.me</span>
        </div>
        <div className='landing__row3 landing__row'>
          <Util.Button
            name='Sign Up'
            size='medium'
            onClick={() => history.push(routes._SIGNUP)}
          />
          <Util.Button
            name='Sign In'
            size='medium'
            onClick={() => history.push(routes._LOGIN)}
          />
        </div>
        <div className='landing__row4 landing__row'>
          <Util.Button
            name='About'
            size='small'
            onClick={() => history.push(routes._ABOUT)}
          />
        </div>
      </div>
    );
  }
}

export default Landing;
