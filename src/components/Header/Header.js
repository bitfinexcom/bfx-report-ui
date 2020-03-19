import React, { PureComponent } from 'react'
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core'

import Status from 'components/Status'
import PrefMenu from 'components/PrefMenu'
import PrefDialog from 'components/PrefDialog'
import SyncMode from 'components/SyncMode'
import LangMenu from 'ui/LangMenu'
import PlatformLogo from 'ui/PlatformLogo'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './Header.props'
import HelpLink from './HelpLink'

const { REACT_APP_ELECTRON } = process.env

class Header extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  state = {
    isPrefOpen: false,
  }

  authLogout = () => {
    const { logout } = this.props
    logout()
  }

  handleClickPref = (e) => {
    e.preventDefault()
    this.setState({ isPrefOpen: true })
  }

  handlePrefDialogClose = (e) => {
    e.preventDefault()
    this.setState({ isPrefOpen: false })
  }

  render() {
    const {
      authIsShown,
      authStatus,
      email,
    } = this.props
    const { isPrefOpen } = this.state

    const isLogin = !authIsShown && authStatus === true

    const renderMenu = isLogin ? (
      <PrefMenu
        isLogin={isLogin}
        handleLogout={this.authLogout}
        handleClickPref={this.handleClickPref}
      />
    ) : (
      <LangMenu />
    )
    const renderEmail = email ? <span className='header-email bitfinex-show-soft'>{email}</span> : null

    const renderSyncMode = platform.showFrameworkMode ? <SyncMode /> : null

    const HOME_URL = REACT_APP_ELECTRON ? '/' : platform.HOME_URL

    const renderBrand = (
      <a href={HOME_URL}>
        <PlatformLogo />
      </a>
    )

    return (
      <div className='header'>
        <Navbar fixedToTop>
          <NavbarGroup align='left'>
            <NavbarHeading>
              {renderBrand}
              {renderEmail}
            </NavbarHeading>
          </NavbarGroup>
          <NavbarGroup align='right'>
            <HelpLink />
            {renderMenu}
            {renderSyncMode}
          </NavbarGroup>
        </Navbar>
        <div className='row'>
          <Status />
        </div>
        <PrefDialog
          isPrefOpen={isPrefOpen}
          handlePrefDialogClose={this.handlePrefDialogClose}
        />
      </div>
    )
  }
}

export default Header
