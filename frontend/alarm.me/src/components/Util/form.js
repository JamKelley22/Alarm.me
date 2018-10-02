import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DateTime from 'react-datetime'

import Button from './button.js'

import './util.scss'

class Form extends React.Component {
  state = {

  }

  handleSubmit = (e) => {
    e.preventDefault();

  }

  render () {
    let FormIcon;
    switch (this.props.icon) {
      case 'feather':
        FormIcon = (<FontAwesomeIcon className='formIcon formIconFlip' icon='feather-alt' />)
        break;
      case 'user':
        FormIcon = (<FontAwesomeIcon className='formIcon' icon='user' />)
        break;
      default:
        FormIcon = (<FontAwesomeIcon className='formIcon formIconFlip' icon='feather-alt' />)
    }

    let components = (
      this.props.formComponents.map((component, i) => {
        switch (component.type) {
          case 'input':
            return (
              <div key={i}>
                <div className='component__input__label'>{component.label}</div>
                <input type="text" name="fname" className='component__input' placeholder={component.placeholder}/>
              </div>
            )
            break;
          case 'dateTime':
            return (
              <div key={i}>
                <div className='component__input__label'>{component.label}</div>
                <DateTime className='component__datetime' placeholder={component.placeholder}/>
              </div>
            );
            break;
          case 'password':
            return (
              <div key={i}>
                <div className='component__input__label'>{component.label}</div>
                <input type="password" name="fname" className='component__input' placeholder={component.placeholder}/>
              </div>
            )
            break;
          default:
            return null;
        }
      })
    );

    return (
      <div className='form__container'>
        <form className='form' onSubmit={this.handleSubmit}>
          <div className='form__top'>
            <div className='form__top__left'>
              <div className='formTitle'>{this.props.title}</div>
              {FormIcon}
            </div>

            <div className='form__top__right'>
              {components}
            </div>
          </div>

          <div className='form__bottom'>
            <Button name={this.props.cancelText} onClick={this.props.onCancel}/>
            <Button name={this.props.confirmText} onClick={this.props.onConfirm}/>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;

Form.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.oneOf(['feather', 'user']),
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

Form.defaultProps = {
  title: 'Form',
  icon: 'feather',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  onConfirm: () => {console.warn("No onConfirm function defined for form")},
  onCancel: () => {console.warn("No onCancel function defined for form")},
  formComponents: [
    {
      type: 'input',
      label: 'Title',
      placeholder: 'class'
    },
    {
      type: 'input',
      label: 'Note',
      placeholder: '8am'
    },
    {
      type: 'dateTime',
      label: 'Date/Time',
      placeholder: 'Click to Enter'
    },
  ]
};
/*
formType: PropTypes.oneOf(['alarm', 'account', 'signup', 'signin']),
*/
