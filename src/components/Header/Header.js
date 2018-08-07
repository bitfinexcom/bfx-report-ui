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
import LangMenu from 'components/LangMenu'
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
    this.switchDark = this.switchTheme.bind(this, 'bp3-dark')
    this.switchLight = this.switchTheme.bind(this, 'bp3-light')
  }

  authLogout() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.logout()
  }

  switchTheme(theme, e) {
    e.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setTheme(theme)
  }

  render() {
    const { authIsShown, authStatus, intl } = this.props
    const buttonLogout = !authIsShown && authStatus === true
      ? (<Button minimal text={intl.formatMessage({ id: 'header.logout' })} onClick={this.authLogout} />) : ''

    return (
      <Fragment>
        <Navbar fixedToTop>
          <NavbarGroup align='left'>
            <NavbarHeading>
              <img
                alt={platform.Name}
                src={darkLogo}
                className='bitfinex-logo-dark hidden-sm hidden-xs'
              />
              <img
                alt={platform.Name}
                src={lightLogo}
                className='bitfinex-logo-light hidden-sm hidden-xs'
              />
              <img
                alt={platform.Name}
                src={mDarkLogo}
                className='bitfinex-logo-m-dark hidden-xl hidden-lg hidden-md'
              />
              <img
                alt={platform.Name}
                src={mLightLogo}
                className='bitfinex-logo-m-light hidden-xl hidden-lg hidden-md'
              />
            </NavbarHeading>
          </NavbarGroup>
          <NavbarGroup align='right'>
            {buttonLogout}
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
            <NavbarDivider />
            <LangMenu />
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
