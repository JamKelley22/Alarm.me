import React from 'react'

import { Util } from '../index.js'

import './signup.scss'

const Signup = (props) => {
  return (
    <div className='signup'>
      <div className='signup__form'>
        <Util.Form
          title='Sign Up'
          icon='feather'
          confirmText='Join'
          cancelText='Cancel'
          onConfirm={() => {console.log("Joined")}}
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
  )
}

export default Signup;
