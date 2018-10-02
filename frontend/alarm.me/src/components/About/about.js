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
                Fugiat consectetur quibusdam aute incurreret, culpa est fabulas est nostrud
              tamen o cupidatat cohaerescant si est in dolor quibusdam, cillum se est labore
              senserit ita ubi quibusdam ubi consequat, ubi incurreret praetermissum se qui
              nisi admodum pariatur. Iis veniam aliqua ex litteris. Possumus iis ullamco, enim
              ut fabulas. Consequat magna consequat iudicem, cernantur amet pariatur, nostrud
              amet anim mentitum veniam, incididunt ex quid, et dolore iudicem relinqueret,
              qui irure a ipsum, fugiat a laborum ne legam, fugiat officia iis magna tempor.Se
              cillum instituendarum ad de ne despicationes do officia ne nisi, nescius summis
              probant. O hic quis eram fugiat, quid efflorescere voluptate nulla consequat. De
              multos pariatur fidelissimae. Velit iudicem id fidelissimae, admodum tamen illum
              laboris sint.
            </p>

          <h2>Who made it?</h2>
            <p>
              Officia esse ad fabulas eruditionem. Do labore fabulas reprehenderit ita
              consequat ut eiusmod. Ea dolore quibusdam reprehenderit, arbitror labore ne
              mentitum praesentibus. Ingeniis aliqua eu offendit despicationes.Noster
              quibusdam probant, nam cillum adipisicing, doctrina amet nulla ne amet, constias
              firmissimum ad admodum. Mentitum fugiat arbitror. Expetendis cillum ut excepteur
              exquisitaque, minim distinguantur laborum ipsum incididunt, ne nisi offendit
              singulis, laboris consectetur ad ullamco an ullamco non legam voluptate te est a
              familiaritatem sed id si aliqua anim quis, se nulla appellat exercitation.
              Officia sint magna est sunt.
            </p>

          <h2>Why?</h2>
            <p>
              Ita id distinguantur nam a noster familiaritatem, consequat id fabulas, fabulas
              tamen minim ubi esse. Malis id vidisse. Nisi quamquam aut quae minim, vidisse
              nisi non probant tractavissent, an occaecat domesticarum, esse fabulas ab anim
              enim in labore pariatur arbitror id a ab irure consequat, et admodum aut
              laborum, eiusmod ne cillum expetendis.Proident nam appellat te doctrina et
              tamen. Noster se laborum est dolor expetendis de officia. Appellat
              concursionibus hic mandaremus ne nam eiusmod distinguantur, se aut nulla fore
              cillum ea sed quem nostrud tractavissent sed e laborum exquisitaque, ne officia
              imitarentur se nostrud dolore doctrina incididunt ne possumus ita incurreret.
            </p>

          <h2>Docs?</h2>
            <p>
              Possumus tempor expetendis, id eram consectetur. Dolor laboris e minim dolore,
              nam labore doctrina consequat e et culpa culpa se offendit ita cupidatat velit a
              officia coniunctione. Excepteur eram expetendis commodo.Excepteur aute te
              possumus coniunctione, aute illustriora quibusdam anim quamquam. Commodo sed
              amet pariatur, o elit fidelissimae. Quae iudicem ingeniis, quid probant an quid
              malis. Fabulas an sint do aut legam legam eu officia nam tempor instituendarum
              quibusdam tempor cernantur ad aut cillum voluptate proident.
            </p>

          <h2>Feedback?</h2>
            <p>
              Ut quem summis eram litteris do excepteur ipsum culpa litteris malis. Ex illum
              cohaerescant id an duis irure ab eiusmod. Ut malis magna iis excepteur, quo quae
              graviterque do sint cupidatat non incurreret est offendit de occaecat quo de in
              sempiternum, de eiusmod cohaerescant, non aliqua velit minim cupidatat si hic
              tamen sempiternum.Eiusmod illum legam se quid si occaecat hic probant, export
              qui officia ita enim se sunt quibusdam cupidatat. Ex de quem eiusmod, arbitror
              ita quem doctrina. Do quem de summis, amet arbitror commodo aut possumus dolor
              in ullamco coniunctione, admodum ne appellat a non minim praesentibus, excepteur
              do pariatur, aut e amet singulis et quem commodo praesentibus.
            </p>

          <h2>Links?</h2>
            <p>
              Ita nam comprehenderit eu o an tamen ingeniis, a consequat transferrem, minim
              incurreret praesentibus. Pariatur summis appellat. Proident in fugiat cupidatat
              a aliqua imitarentur incurreret quem fabulas.In multos comprehenderit, ea ex
              firmissimum. Si aut distinguantur. Aute ita quibusdam ab sunt, mentitum velit
              quorum an aute.
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
