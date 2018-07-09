import React, { Fragment } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
} from '@blueprintjs/core'
import Status from 'components/Status'
import { platform } from 'var/config'
import { propTypes, defaultProps } from './Header.props'
import darkLogo from './logo3-dark-theme.svg'
import lightLogo from './logo3-light-theme.svg'
import mDarkLogo from './mobile_logo_dark.svg'
import mLightLogo from './mobile_logo_light.svg'

function switchDark(e) {
  e.preventDefault()
  document.body.className = 'pt-dark'
}

function switchLight(e) {
  e.preventDefault()
  document.body.className = 'pt-light'
}

function switchLang(e, lang) {
  e.preventDefault()
  localStorage.setItem('lang', lang)
  window.location.reload()
}

function switchEn(e) {
  switchLang(e, 'en')
}

function switchTw(e) {
  switchLang(e, 'tw')
}

function Header(props) {
  const {
    authIsShown, authStatus, logout, intl,
  } = props
  function authLogout() {
    logout()
  }

  const buttonLogout = !authIsShown && authStatus === true ? (<Button minimal text={intl.formatMessage({ id: 'header.logout' })} onClick={authLogout} />) : ''

  return (
    <Navbar fixedToTop>
      <NavbarGroup align='left'>
        <NavbarHeading>
          <img alt={platform.Name} src={darkLogo} className='bitfinex-logo-dark' />
          <img alt={platform.Name} src={lightLogo} className='bitfinex-logo-light' />
          <img alt={platform.Name} src={mDarkLogo} className='bitfinex-logo-m-dark' />
          <img alt={platform.Name} src={mLightLogo} className='bitfinex-logo-m-light' />
        </NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align='right'>
        {buttonLogout}
        <NavbarDivider />
        <Button minimal text={intl.formatMessage({ id: 'header.lang.en' })} onClick={switchEn} />
        <Button minimal text={intl.formatMessage({ id: 'header.lang.tw' })} onClick={switchTw} />
        <NavbarDivider />
        <Button minimal name='light' text={intl.formatMessage({ id: 'theme.light' })} onClick={switchLight} />
        <Button minimal name='dark' text={intl.formatMessage({ id: 'theme.dark' })} onClick={switchDark} />
      </NavbarGroup>
    </Navbar>
  )
}

Header.propTypes = propTypes
Header.defaultProps = defaultProps

export default injectIntl(Header)
