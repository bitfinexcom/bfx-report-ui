import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Menu,
  Popover,
  MenuItem,
  Position,
} from '@blueprintjs/core'

import Icon from 'icons'
import config from 'config'
import { getPath } from 'state/query/utils'
import queryConstants from 'state/query/constants'

import SyncMode from '../SyncMode'
import QueryMode from '../QueryMode'
import { openHelp } from '../utils'

const { showFrameworkMode } = config
const { MENU_LOGINS, MENU_SUB_ACCOUNTS, MENU_CHANGE_LOGS } = queryConstants
const formatUsername = (username = '') => (username.includes('@') ? `${username.split('@')[0]}` : username)

const TopNavigation = ({
  t,
  email,
  logout,
  history,
  togglePrefDialog,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const togglePopover = (isPopoverOpen) => {
    setIsOpen(isPopoverOpen)

    const headerBrand = document.getElementsByClassName('header-brand')[0]
    if (isOpen) {
      headerBrand.classList.add('top-navigation--open')
    } else {
      headerBrand.classList.remove('top-navigation--open')
    }
  }

  const switchSection = (type) => {
    history.push({ pathname: getPath(type) })
  }

  const classes = classNames('top-navigation', {
    'top-navigation--open': isOpen,
  })

  if (window.innerWidth > 855) {
    return null
  }

  return (
    <div className={classes}>
      <Popover
        minimal
        autoFocus={false}
        position={Position.BOTTOM_RIGHT}
        portalClassName='top-navigation-portal'
        onOpening={() => togglePopover(true)}
        onClosing={() => togglePopover(false)}
        content={(
          <div className='top-navigation-content'>
            <Menu>
              <MenuItem
                icon={<Icon.USER_CIRCLE />}
                shouldDismissPopover={false}
                text={formatUsername(email)}
                className='bp3-menu-item--account'
              />
              <MenuItem
                text={<SyncMode />}
                shouldDismissPopover={false}
                className={classNames('bp3-menu-item--sync', {
                  'bp3-menu-item--sync--removed': !showFrameworkMode,
                })}
              />
              <MenuItem
                text={<QueryMode />}
                shouldDismissPopover={false}
                className={classNames('bp3-menu-item--query', {
                  'bp3-menu-item--query--disabled': !showFrameworkMode,
                })}
              />
              <MenuItem
                onClick={togglePrefDialog}
                icon={<Icon.SLIDER_CIRCLE_H />}
                text={t('header.preferences')}
              />
              <MenuItem
                icon={<Icon.SIGN_IN />}
                text={t('navItems.loginHistory')}
                onClick={() => switchSection(MENU_LOGINS)}
              />
              {showFrameworkMode && (
              <MenuItem
                icon={<Icon.USER_CIRCLE />}
                text={t('navItems.subAccounts')}
                onClick={() => switchSection(MENU_SUB_ACCOUNTS)}
              />
              )}
              <MenuItem
                icon={<Icon.NOTEBOOK />}
                text={t('navItems.changeLogs')}
                onClick={() => switchSection(MENU_CHANGE_LOGS)}
              />
              <MenuItem
                onClick={openHelp}
                text={t('header.help')}
                icon={<Icon.INFO_CIRCLE />}
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
        popoverClassName='top-navigation-popover'
      >
        <span className='top-navigation-icon-wrapper'>
          {isOpen ? <Icon.CLOSE /> : <Icon.USER_CIRCLE />}

        </span>
      </Popover>
    </div>
  )
}

TopNavigation.propTypes = {
  t: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  togglePrefDialog: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default memo(TopNavigation)
