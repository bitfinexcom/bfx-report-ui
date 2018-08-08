import React, { Fragment, PureComponent } from 'react'
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core'

import Status from 'components/Status'
import PrefMenu from 'components/PrefMenu'
import PrefDialog from 'components/PrefDialog'
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
    this.handleClickPref = this.handleClickPref.bind(this)
    this.handlePrefDialogClose = this.handlePrefDialogClose.bind(this)
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

  handlePrefDialogClose(e) {
    e.preventDefault()
    this.setState({ isPrefOpen: false })
  }

  render() {
    const { authIsShown, authStatus } = this.props
    const { isPrefOpen } = this.state

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
            <PrefMenu
              isLogin={!authIsShown && authStatus === true}
              handleLogout={this.authLogout}
              handleClickPref={this.handleClickPref}
            />
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

export default Header
