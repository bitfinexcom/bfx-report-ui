import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  Menu,
  MenuItem,
  Popover,
  Position,
} from '@blueprintjs/core'
import _isString from 'lodash/isString'

import Icon from 'icons'

import SyncMode from '../SyncMode'
import QueryMode from '../QueryMode'
import { openHelp } from '../utils'

const formatUsername = (email = '') => {
  if (!_isString(email)) {
    return ''
  }
  return email.includes('@') ? `${email.split('@')[0]}` : email
}

const AccountMenu = ({
  t,
  email,
  logout,
  authStatus,
  togglePrefDialog,
  toggleExportDialog,
}) => (
  <div
    className={classNames(
      'account-menu',
      { 'account-menu--no-email': !authStatus || !email },
    )}
  >
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
              onClick={openHelp}
              icon={<Icon.INFO_CIRCLE />}
              text={t('header.help')}
            />
            <MenuItem
              className='account-menu-sync'
              shouldDismissPopover={false}
              text={<SyncMode />}
            />
            <MenuItem
              className='account-menu-query'
              shouldDismissPopover={false}
              text={<QueryMode />}
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
    >
      <div className='account-menu-wrapper'>
        <div className='account-menu-target'>
          <Icon.USER_CIRCLE />
          <span className='account-menu-username'>
            {authStatus ? formatUsername(email) : ''}
          </span>
          <Icon.CHEVRON_DOWN />
          <Icon.CHEVRON_UP />
        </div>
      </div>
    </Popover>
  </div>
)


AccountMenu.propTypes = {
  authStatus: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  toggleExportDialog: PropTypes.func.isRequired,
  togglePrefDialog: PropTypes.func.isRequired,
}

export default withTranslation('translations')(AccountMenu)
