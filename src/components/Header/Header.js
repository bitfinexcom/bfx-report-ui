import React, { Fragment, PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Popover,
  PopoverInteractionKind,
  Position,
} from '@blueprintjs/core'

import Status from 'components/Status'
import LangMenu from 'components/LangMenu'
import PrefMenu from 'components/PrefMenu'
import PrefDialog from 'components/PrefDialog'
import SyncMode from 'components/SyncMode'
import ToggleMenu from 'ui/ToggleMenu'
import baseType from 'state/base/constants'
import { getTraget } from 'state/query/utils'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './Header.props'
import darkLogo from './logo3-dark-theme.svg'
import lightLogo from './logo3-light-theme.svg'
import mDarkLogo from './mobile_logo_dark.svg'
import mLightLogo from './mobile_logo_light.svg'
import HelpLink from './HelpLink'

class Header extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.authLogout = this.authLogout.bind(this)
    this.handleClickPref = this.handleClickPref.bind(this)
    this.handleClickCustom = this.handleClickCustom.bind(this)
    this.handlePrefDialogClose = this.handlePrefDialogClose.bind(this)
    this.handleToggleMenu = this.handleToggleMenu.bind(this)
  }

  state = {
    isPrefOpen: false,
  }

  authLogout() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.logout()
  }

  handleClickPref(e) {
    e.preventDefault()
    this.setState({ isPrefOpen: true })
  }

  handleClickCustom(e) {
    e.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.showCustomDialog(true)
  }

  handlePrefDialogClose(e) {
    e.preventDefault()
    this.setState({ isPrefOpen: false })
  }

  handleToggleMenu(e) {
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
      history,
      intl,
      location,
    } = this.props
    const { isPrefOpen } = this.state

    const target = getTraget(location.pathname)
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
              intl={intl}
              menuMode={baseType.MENU_MODE_HOVER}
            />
          )}
        >
          <Button
            minimal
            icon='menu'
          />
        </Popover>
        <span className='hidden-xs hidden-sm hidden-md'>
          <Button
            minimal
            icon='menu'
            onClick={this.handleToggleMenu}
          />
        </span>
        &nbsp;
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
    const renderSyncMode = platform.showSyncMode ? (<SyncMode />) : null

    return (
      <Fragment>
        <Navbar fixedToTop>
          <NavbarGroup align='left'>
            <NavbarHeading>
              {renderToggleMenu}
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
            <HelpLink />
            {renderSyncMode}
            {renderMenu}
          </NavbarGroup>
        </Navbar>
        <div className='row'>
          <Status />
        </div>
        <PrefDialog
          isPrefOpen={isPrefOpen}
          handlePrefDialogClose={this.handlePrefDialogClose}
        />
      </Fragment>
    )
  }
}

export default injectIntl(Header)
