import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import {
  Button,
  Intent,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
} from '@blueprintjs/core'
import { platform } from 'var/config'

function switchDark(e) {
  e.preventDefault()
  document.body.className = 'pt-dark'
}

function switchLight(e) {
  e.preventDefault()
  document.body.className = ''
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
  const { intl } = props
  function showAuth() {
    props.showAuth()
  }

  return (
    <Navbar fixedToTop>
      <NavbarGroup align='left'>
        <NavbarHeading>{platform.Name} Report</NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align='right'>
        <Button minimal text={intl.formatMessage({ id: 'Auth' })} intent={Intent.PRIMARY} onClick={showAuth} />
        <NavbarDivider />
        <Button minimal text='En' onClick={switchEn} />
        <Button minimal text='正' onClick={switchTw} />
        <NavbarDivider />
        <Button minimal name='light' text={intl.formatMessage({ id: 'Light' })} onClick={switchLight} />
        <Button minimal name='dark' text={intl.formatMessage({ id: 'Dark' })} onClick={switchDark} />
      </NavbarGroup>
    </Navbar>
  )
}

Header.propTypes = {
  intl: PropTypes.object.isRequired,
  showAuth: PropTypes.func.isRequired,
}

export default injectIntl(Header)
