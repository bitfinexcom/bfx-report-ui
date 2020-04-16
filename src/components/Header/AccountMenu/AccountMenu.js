import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  Menu,
  MenuItem,
  Popover,
  Position,
} from '@blueprintjs/core'

import Icon from 'icons'

import { propTypes, defaultProps } from './AccountMenu.props'
import SyncMode from '../SyncMode'

const HELP_LINK = 'https://support.bitfinex.com/hc/en-us/articles/360008951853'

const formatUsername = (username = '') => (username.includes('@') ? `${username.split('@')[0]}` : username)

class AccountMenu extends PureComponent {
  openHelp = () => window.open(HELP_LINK)

  render() {
    const {
      email,
      logout,
      t,
      toggleExportDialog,
      togglePrefDialog,
    } = this.props

    return (
      <div className={classNames('account-menu', { 'account-menu--no-email': !email })}>
        <Popover
          minimal
          position={Position.BOTTOM_LEFT}
          content={(
            <div className='account-menu-content'>
              <Menu>
                <MenuItem
                  onClick={togglePrefDialog}
                  icon={<Icon.SLIDER_CIRCLE_H />}
                  text={t('header.preferences')}
                />
                <MenuItem
                  className='account-menu-export'
                  onClick={toggleExportDialog}
                  icon={<Icon.FILE_EXPORT />}
                  text={t('download.export')}
                />
                <MenuItem
                  onClick={this.openHelp}
                  icon={<Icon.INFO_CIRCLE />}
                  text={t('header.help')}
                />
                <MenuItem
                  className='account-menu-sync'
                  shouldDismissPopover={false}
                  text={<SyncMode />}
                />
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
              <span className='account-menu-username'>
                {formatUsername(email)}
              </span>
              <Icon.CHEVRON_DOWN />
              <Icon.CHEVRON_UP />
            </div>
          </div>
        </Popover>
      </div>
    )
  }
}

AccountMenu.propTypes = propTypes
AccountMenu.defaultProps = defaultProps

export default withTranslation('translations')(AccountMenu)
