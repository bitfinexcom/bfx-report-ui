import React, { PureComponent } from 'react'

import Status from 'components/Status'
import PrefMenu from 'components/PrefMenu'
import PrefDialog from 'components/PrefDialog'
import SyncMode from 'components/SyncMode'
import LangMenu from 'ui/LangMenu'
import PlatformLogo from 'ui/PlatformLogo'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './Header.props'
import TimeFrame from './TimeFrame'
import HelpLink from './HelpLink'

const { REACT_APP_ELECTRON } = process.env

class Header extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  state = {
    isPrefOpen: false,
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
      logout,
    } = this.props
    const { isPrefOpen } = this.state

    const isLogin = !authIsShown && authStatus === true

    const renderMenu = isLogin ? (
      <PrefMenu
        isLogin={isLogin}
        handleLogout={logout}
        handleClickPref={this.handleClickPref}
      />
    ) : (
      <LangMenu />
    )
    const renderEmail = email ? <span className='header-email bitfinex-show-soft'>{email}</span> : null

    const renderSyncMode = platform.showFrameworkMode ? <SyncMode /> : null

    const HOME_URL = REACT_APP_ELECTRON ? '/' : platform.HOME_URL

    return (
      <div className='header'>
        <div className='header-brand'>
          <a href={HOME_URL} className='header-brand-logo'>
            <PlatformLogo />
          </a>
        </div>
        <div className='header-timeframe'>
          <TimeFrame />
        </div>

        {renderEmail}
        <HelpLink />
        {renderMenu}
        {renderSyncMode}
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
