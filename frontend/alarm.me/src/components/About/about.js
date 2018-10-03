import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Util } from '../index.js'
import { history, routes } from '../../history.js'

import './about.scss'

const openTab = (url) => {
  window.open(url, '_blank');
}

const About = (props) => {
  return (
    <div className='about'>
      <div className='about__box'>
        <div className='about__box__title'>About</div>
        <div className='about__box__content'>
          <h2>What is it?</h2>
            <p>
                Alarm.me is a web application that allows users to schedule, update, and delete alarms online.
              These alarms alert the user at important times during the day.
            </p>

          <h2>Who made it?</h2>
            <p>
              This application was designed, devloped, tested (limited), and deployed by Jameel Kelley
            </p>
            <p>
                Jameel is a Junior at ISU majoring in Software Engineering. He spent the summer of 2018 working at <a href='http://www.designmillinc.com/' target='_blank'>Design Mill Inc</a> developing on VR platforms.
              His interests lie in Web & Game Development
            </p>

          <h2>Why?</h2>
            <p>
              The core reason for this projects creation is the fullfillment of the coding challange put forth by <a href='https://www.criticallabs.io/' target='_blank'>Critical Labs. </a>
            On 9/25/18 I was given a requirements document that asked for fullfillment of a few goals. The goals of this change is to deliver a web application that allows for scheduling
            and alarm notifications to ensure that Johnny is able to wake up on time. The core of the document given is as follows...
            </p>
            <p>
              Johnny keeps oversleeping and missing class! He needs your help to build an alarm clock that can keep track of his schedule and make sure he's up in time. He’s heard of this cool Javascript framework called ReactJS and asked you to build a web frontend using it.

              He also heard that Javascript can be used for the backend, too, and was thinking that you could develop a simple API to manage his schedule using NodeJS and ExpressJS. Johnny’s schedule is as follows
              <br/>
              <br/>Monday - 7am
              <br/>Tuesday - 9am
              <br/>Wednesday - 9am
              <br/>Thursday - 7:45am
              <br/>Friday - 8:15am
              <br/>Saturday - Sleep in! (no alarm)
              <br/>Sunday - Sleep in! (no alarm)

            </p>
          <h2>Docs?</h2>
            <p>
              Documentation for this project can be found on the <a href='https://github.com/JamKelley22/Critical-Labs-Alarm-Clock-Challenge/tree/master/docs' target='_blank'>GitHub page for Alarm.me</a>
            </p>

          <h2>Feedback?</h2>
            <p>
              For Issues go <a href='https://github.com/JamKelley22/Critical-Labs-Alarm-Clock-Challenge/issues' target='_blank'>here</a>
            </p>
            <p>
              To send me a message go <a href='https://www.jamkelley.com/contact' target='_blank'>here</a>
            </p>

          <h2>Links?</h2>
            <p>
              <br/><a href='https://github.com/JamKelley22' target='_blank'>GitHub</a>
              <br/><a href='https://www.linkedin.com/in/jamkelley22/' target='_blank'>LinkedIn</a>
              <br/><a href='https://www.jamkelley.com/' target='_blank'>Website</a> (Still under Devlopment)
            </p>

        </div>
      </div>
      <div className='about__box__icons__container'>
        <div className='about__box__icons'>
          <Util.Button
            name='Back'
            size='small'
            onClick={() => history.goBack()}
            className='about__box__icon'
          />

          <Util.Button
            name='Back'
            size='small'
            square={true}
            onClick={() => openTab('https://github.com/JamKelley22/Critical-Labs-Alarm-Clock-Challange')}
            className='about__box__icon'
          >
            <FontAwesomeIcon
              className='fontawesome__github'
              icon={['fab', 'github']}
            />
          </Util.Button>

          <Util.Button
            name='Home'
            size='small'
            onClick={() => history.push(routes._HOME)}
            className='about__box__icon'
          />
        </div>
      </div>
    </div>
  )
}

export default About;
