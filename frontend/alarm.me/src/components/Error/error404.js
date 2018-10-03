import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Util } from '../index.js'
import { history, routes } from '../../history.js'

import LeftSVG from '../../Images/SVG/left.svg'
import RightSVG from '../../Images/SVG/right.svg'

import './error404.scss'

class Error404 extends React.Component {
  render () {
    return (
      <div className='error404'>
        <img src={LeftSVG} className='svg leftSVG' alt='Left Backround SVG'/>
        <img src={RightSVG} className='svg rightSVG' alt='Right Backround SVG'/>

        <div className='error404__row1 error404__row' >
          <FontAwesomeIcon
            className='fontawesome__feather fontawesome__feather--rotate'
            icon='feather-alt'
          />
        </div>

        <div className='error404__row2 error404__row'>
          <span className='appname'>Error 404</span>
        </div>

        <div className='error404__row3 error404__row'>
          <Util.Button
            name='To Safety'
            size='large'
            onClick={() => history.push(routes._LANDING)}
          />
        </div>
      </div>
    );
  }
}

export default Error404;
