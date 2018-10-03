import React from 'react'

import { Util } from '../index.js'
import { history, routes } from '../../history.js'

import { setUserID, JohnnyUserID } from '../../constants/'

import './signup.scss'

let SignupFormComponents = () =>
[
  {
    type: 'input',
    label: 'Title',
    placeholder: 'Class',
    isValid: ['!null']
  },
  {
    type: 'input',
    label: 'Note',
    placeholder: '8 AM',
    isValid: ['!null']
  },
  {
    type: 'password',
    label: 'Password',
    placeholder: 'Lary123',
    isValid: ['!null']
  },
  {
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Lary123',
    isValid: ['!null']
  }
]

const loginJohnny = () => {
  setUserID(JohnnyUserID)
  history.push(routes._HOME)
}

const Signup = (props) => {
  return (
    <div className='signup'>
      <div className='signup__form'>
        <Util.Form
          title='Sign Up'
          icon='feather'
          confirmText='Join'
          cancelText='Cancel'
          onConfirm={(res) => {console.log(res)}}
          onCancel={() => {history.push(routes._LANDING)}}
          formComponents={SignupFormComponents}
          johnny={true}
          onJohnny={() => loginJohnny()}
        />
      </div>
    </div>
  )
}

export default Signup;
