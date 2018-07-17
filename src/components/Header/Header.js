import React, { Fragment, PureComponent } from 'react'
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

class Header extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.authLogout = this.authLogout.bind(this)
    this.switchEn = this.switchLang.bind(this, 'en')
    this.switchTw = this.switchLang.bind(this, 'tw')
    this.switchDark = this.switchTheme.bind(this, 'pt-dark')
    this.switchLight = this.switchTheme.bind(this, 'pt-light')
  }

  authLogout() {
    this.props.logout()
  }

  switchLang(lang, e) {
    e.preventDefault()
    this.props.setLang(lang)
  }

  switchTheme(theme, e) {
    e.preventDefault()
    this.props.setTheme(theme)
  }

  render() {
    const { authIsShown, authStatus, intl } = this.props
    const buttonLogout = !authIsShown && authStatus === true ?
      (<Button minimal text={intl.formatMessage({ id: 'header.logout' })} onClick={this.authLogout} />) : ''

    return (
      <Fragment>
        <Navbar fixedToTop>
          <NavbarGroup align='left'>
            <NavbarHeading>
              <img
                alt={platform.Name}
                src={darkLogo}
                className='bitfinex-logo-dark hidden-sm hidden-xs' />
              <img
                alt={platform.Name}
                src={lightLogo}
                className='bitfinex-logo-light hidden-sm hidden-xs' />
              <img
                alt={platform.Name}
                src={mDarkLogo}
                className='bitfinex-logo-m-dark hidden-xl hidden-lg hidden-md' />
              <img
                alt={platform.Name}
                src={mLightLogo}
                className='bitfinex-logo-m-light hidden-xl hidden-lg hidden-md' />
            </NavbarHeading>
          </NavbarGroup>
          <NavbarGroup align='right'>
            {buttonLogout}
            <NavbarDivider />
            <Button minimal text={intl.formatMessage({ id: 'header.lang.en' })} onClick={this.switchEn} />
            <Button minimal text={intl.formatMessage({ id: 'header.lang.tw' })} onClick={this.switchTw} />
            <NavbarDivider />
            <Button
              minimal
              name='light'
              text={intl.formatMessage({ id: 'theme.light' })}
              onClick={this.switchLight}
            />
            <Button
              minimal
              name='dark'
              text={intl.formatMessage({ id: 'theme.dark' })}
              onClick={this.switchDark}
            />
          </NavbarGroup>
        </Navbar>
        <div className='row'>
          <Status />
        </div>
      </Fragment>
    )
  }
}

export default injectIntl(Header)
