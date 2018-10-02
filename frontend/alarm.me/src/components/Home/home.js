import React from 'react'
import moment from 'moment';

import { Top } from '../index.js'
import User from './user.js'
import SecondsBar from './secondsBar.js'

import './home.scss'

const ONE_SECOND = 1000;
let TIME_INTERVAL = ONE_SECOND;

class Home extends React.Component {
  state = {
    time: Date.now()
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: Date.now()
      })
    },TIME_INTERVAL
    );
  }

  render () {
    return (
      <React.Fragment>
        <Top
          showAlarms={true}
        />

        <div className='home'>
          <User/>
          <div id='time'>
            {moment(this.state.time).format('LT')}
            <div id='secondsBarWrapper'>
              <SecondsBar
                numSeconds={parseInt(moment(this.state.time).format('s'), 10)}
              />
            </div>
          </div>

          <div id='day'>
            {moment(this.state.time).format('dddd')}
          </div>

          <div id='date'>
            {moment(this.state.time).format('MMMM Do')}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
