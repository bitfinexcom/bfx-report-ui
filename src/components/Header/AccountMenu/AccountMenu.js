import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  Menu,
  MenuDivider,
  MenuItem,
  Popover,
  Position,
} from '@blueprintjs/core'

import Icon from 'icons'
import Preferences from 'components/Preferences'

import { propTypes, defaultProps } from './AccountMenu.props'

const HELP_LINK = 'https://support.bitfinex.com/hc/en-us/articles/360008951853'

const formatUsername = (username = '') => (username.includes('@') ? `${username.split('@')[0]}` : username)

class AccountMenu extends PureComponent {
  state = {
    isPrefOpen: false,
  }

  togglePref = () => this.setState(({ isPrefOpen }) => ({ isPrefOpen: !isPrefOpen }))

  openHelp = () => window.open(HELP_LINK)

  render() {
    const {
      email,
      logout,
      t,
    } = this.props
    const { isPrefOpen } = this.state

    return (
      <div className={classNames('account-menu', { 'account-menu--no-email': !email })}>
        <Popover
          minimal
          position={Position.BOTTOM_LEFT}
          content={(
            <div className='account-menu-content'>
              <Menu>
                <MenuItem
                  onClick={this.togglePref}
                  icon={<Icon.SLIDER_CIRCLE_H />}
                  text={t('header.preferences')}
                />
                <MenuDivider />
                <MenuItem
                  onClick={this.openHelp}
                  icon={<Icon.INFO_CIRCLE />}
                  text={t('header.help')}
                />
                <MenuDivider />
                <MenuItem
                  onClick={logout}
                  icon={<Icon.SIGN_OUT />}
                  text={t('header.logout')}
                />
              </Menu>
            </div>
          )}
          targetTagName='div'
          className='bitfinex-dropdown'
        >
          <div className='account-menu-wrapper'>
            <div className='account-menu-target'>
              <Icon.USER_CIRCLE />
              <span className='account-menu-range'>
                {formatUsername(email)}
              </span>
              <Icon.CHEVRON_DOWN />
              <Icon.CHEVRON_UP />
            </div>
          </div>
        </Popover>

        <Preferences
          isOpen={isPrefOpen}
          handlePrefDialogClose={this.togglePref}
        />
      </div>
    )
  }
}

AccountMenu.propTypes = propTypes
AccountMenu.defaultProps = defaultProps

export default withTranslation('translations')(AccountMenu)
