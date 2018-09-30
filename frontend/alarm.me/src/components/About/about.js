import React from 'react'

import { Top } from '../index.js'

const About = (props) => {
  return (
    <React.Fragment>
      <Top
        showAlarms={false}
      />

      <div>
        <h1>About</h1>
      </div>
    </React.Fragment>
  )
}

export default About;
