import React from 'react'

import { Top, Util } from '../index.js'

import './account.scss'

class Account extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Top
          showAlarms={false}
        />

      <div className='account'>
          <div className='account__form'>
            <Util.Form
              title='Account'
              icon='user'
              confirmText='Update'
              cancelText='Cancel'
              onConfirm={(res) => {console.log(res)}}
              onCancel={() => {console.log("Canceled")}}
              formComponents={[
                {
                  type: 'input',
                  label: 'Title',
                  placeholder: 'Class'
                },
                {
                  type: 'input',
                  label: 'Note',
                  placeholder: '8 AM'
                },
                {
                  type: 'password',
                  label: 'Password',
                  placeholder: 'Lary123'
                },
                {
                  type: 'password',
                  label: 'Confirm Password',
                  placeholder: 'Lary123'
                }
              ]}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Account;
