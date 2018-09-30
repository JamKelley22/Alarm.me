import React from 'react'

import { Top } from '../index.js'

class Account extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Top
          showAlarms={false}
        />

        <div>
          <h1>Account</h1>
        </div>
      </React.Fragment>
    );
  }
}

export default Account;
