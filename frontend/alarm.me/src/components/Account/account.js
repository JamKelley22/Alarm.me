import React from 'react'

import { Top, Util } from '../index.js'

import './account.scss'

let AccountFormComponents = (user) =>
[
{
  type: 'input',
  label: 'Change Name',
  placeholder: ''
},
{
  type: 'input',
  label: 'Change Email',
  placeholder: ''
},
{
  type: 'password',
  label: 'Change Password',
  placeholder: ''
},
{
  type: 'password',
  label: 'Confirm Password',
  placeholder: ''
}]

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
              formComponents={AccountFormComponents}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Account;
