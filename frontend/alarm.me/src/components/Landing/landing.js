import React from 'react'
import { Util } from '../index.js'

import './landing.scss'

class Landing extends React.Component {

  signUp = () => {

  }

  signIn = () => {

  }

  render () {
    return (
      <div>
        <Util.Button
          name='Sign Up'
          size='medium'
          onClick={this.signUp}
        />
        <Util.Button
          name='Sign In'
          size='medium'
          onClick={this.signIn}
        />
      </div>
    );
  }
}

export default Landing;
