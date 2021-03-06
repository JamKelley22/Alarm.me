import React from 'react'

import { Util } from '../index.js'
import { history, routes } from '../../history.js'

import { setUserID, JohnnyUserID } from '../../constants/'

import './login.scss'

let LoginFormComponents = () =>
[{
    type: 'input',
    label: 'Title',
    placeholder: 'Class'
  },
  {
    type: 'input',
    label: 'Note',
    placeholder: '8 AM',
  },
  {
    type: 'password',
    label: 'Password',
    placeholder: 'Lary123'
  }]

const loginJohnny = () => {
  setUserID(JohnnyUserID)
  history.push(routes._HOME)
}

const Login = (props) => {
  return (
    <div className='login'>
      <div className='login__form'>
        <Util.Form
          title='Sign In'
          icon='feather'
          confirmText='Sign In'
          cancelText='Cancel'
          onConfirm={(res) => {console.log(res)}}
          onCancel={() => {history.push(routes._LANDING)}}
          formComponents={LoginFormComponents}
          johnny={true}
          onJohnny={() => loginJohnny()}
        />
      </div>
    </div>
  )
}

export default Login;
