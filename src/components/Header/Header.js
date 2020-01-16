import React, { Fragment, PureComponent } from 'react'
import {
  Button,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Popover,
  PopoverInteractionKind,
  Position,
} from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import Status from 'components/Status'
import PrefMenu from 'components/PrefMenu'
import PrefDialog from 'components/PrefDialog'
import SyncMode from 'components/SyncMode'
import LangMenu from 'ui/LangMenu'
import ToggleMenu from 'ui/ToggleMenu'
import baseType from 'state/base/constants'
import { getTarget } from 'state/query/utils'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './Header.props'
// eslint-disable-next-line import/no-unresolved
import darkLogo from './logo3-dark-theme.svg'
import lightLogo from './logo3-light-theme.svg'
// eslint-disable-next-line import/no-unresolved
import HelpLink from './HelpLink'

class Header extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  state = {
    isPrefOpen: false,
  }

  authLogout = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.logout()
  }

  handleClickPref = (e) => {
    e.preventDefault()
    this.setState({ isPrefOpen: true })
  }

  handleClickCustom = (e) => {
    e.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.showCustomDialog(true)
  }

  handlePrefDialogClose = (e) => {
    e.preventDefault()
    this.setState({ isPrefOpen: false })
  }

  handleToggleMenu = (e) => {
    e.preventDefault()
    const { menuMode, setMenuMode } = this.props
    const { MENU_MODE_ICON, MENU_MODE_NORMAL } = baseType
    const mode = menuMode === MENU_MODE_ICON ? MENU_MODE_NORMAL : MENU_MODE_ICON
    setMenuMode(mode)
  }

  render() {
    const {
      authIsShown,
      authStatus,
      email,
      history,
      location,
    } = this.props
    const { isPrefOpen } = this.state

    const target = getTarget(location.pathname)
    const isLogin = !authIsShown && authStatus === true
    const renderToggleMenu = isLogin ? (
      <Fragment>
        <Popover
          className='hidden-lg hidden-xl'
          interactionKind={PopoverInteractionKind.CLICK}
          position={Position.BOTTOM}
          content={(
            <ToggleMenu
              target={target}
              handleClickCustom={this.handleClickCustom}
              history={history}
              menuMode={baseType.MENU_MODE_HOVER}
            />
          )}
        >
          <Button
            minimal
            icon={IconNames.MENU}
          />
        </Popover>
        <span className='hidden-xs hidden-sm hidden-md'>
          <Button
            minimal
            icon={IconNames.MENU}
            onClick={this.handleToggleMenu}
          />
        </span>
        {' '}
      </Fragment>
    ) : null
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

    const renderBrand = (
      <a href={platform.HOME_URL}>
        <img
          alt={platform.Name}
          src={darkLogo}
          className='bitfinex-logo bitfinex-logo--dark'
        />
        <img
          alt={platform.Name}
          src={lightLogo}
          className='bitfinex-logo bitfinex-logo--light'
        />
      </a>
    )

    return (
      <div className='header'>
        <Navbar fixedToTop>
          <NavbarGroup align='left'>
            <NavbarHeading>
              {renderToggleMenu}
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
