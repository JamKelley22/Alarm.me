import React from 'react'
import PropTypes from 'prop-types'

import './about.scss'

const Attribution = (props) => {
  return (
    <div className='attribution'>
      <div className='attribution__left'>
        <div className='title'>
          {props.title}
        </div>

        <div className='author'>
          {props.author}
        </div>
      </div>

      <div className='attribution__right'>
        <div className='license'>
          {props.license}
        </div>

        <div className='copyright'>
          {props.copyright}
        </div>

        <div className='disclaimer'>
          {props.disclaimer}
        </div>
      </div>

      <div className='uri'>
        <a href={props.uri} target='_blank'>Link</a>
      </div>
    </div>
  )
}

export default Attribution;

Attribution.propTypes = {
  author: PropTypes.string,
  copyright: PropTypes.string,
  title: PropTypes.string,
  license: PropTypes.string,
  disclaimer: PropTypes.string,
  uri: PropTypes.string
};

Attribution.defaultProps = {

};
