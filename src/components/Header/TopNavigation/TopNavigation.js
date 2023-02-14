import React, { PureComponent } from 'react'
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

import SyncMode from '../SyncMode'
import QueryMode from '../QueryMode'
import { openHelp } from '../utils'

const { showFrameworkMode } = config
const formatUsername = (username = '') => (username.includes('@') ? `${username.split('@')[0]}` : username)

class TopNavigation extends PureComponent {
  static propTypes = {
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

  state = {
    isOpen: false,
  }

  togglePopover = (isOpen) => {
    this.setState({ isOpen })

    const headerBrand = document.getElementsByClassName('header-brand')[0]
    if (isOpen) {
      headerBrand.classList.add('top-navigation--open')
    } else {
      headerBrand.classList.remove('top-navigation--open')
    }
  }

  switchSection = (type) => {
    const { history } = this.props
    history.push({ pathname: getPath(type) })
  }

  render() {
    const {
      t,
      email,
      logout,
      togglePrefDialog,
    } = this.props
    const { isOpen } = this.state

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
          onOpening={() => this.togglePopover(true)}
          onClosing={() => this.togglePopover(false)}
          content={(
            <div className='top-navigation-content'>
              <Menu>
                <MenuItem
                  className={classNames('bp3-menu-item--sync', {
                    'bp3-menu-item--sync--removed': !showFrameworkMode,
                  })}
                  shouldDismissPopover={false}
                  text={<SyncMode />}
                />
                <MenuItem
                  className={classNames('bp3-menu-item--query', {
                    'bp3-menu-item--query--disabled': !showFrameworkMode,
                  })}
                  shouldDismissPopover={false}
                  text={<QueryMode />}
                />
                <MenuItem
                  className='bp3-menu-item--account'
                  icon={<Icon.USER_CIRCLE />}
                  shouldDismissPopover={false}
                  text={formatUsername(email)}
                />
                <MenuItem
                  className='bp3-menu-item--subitem'
                  onClick={togglePrefDialog}
                  text={t('header.preferences')}
                />
                <MenuItem
                  className='bp3-menu-item--subitem'
                  onClick={openHelp}
                  text={t('header.help')}
                />
                <MenuItem
                  className='bp3-menu-item--subitem'
                  onClick={logout}
                  text={t('header.logout')}
                />
              </Menu>
            </div>
          )}
          targetTagName='div'
          popoverClassName='top-navigation-popover'
        >
          <span>
            <Icon.CLOSE />
            <Icon.HAMBURGER_MENU />
            {isOpen && <span className='top-navigation-title'>{t('header.top_navigation')}</span>}
          </span>
        </Popover>
      </div>
    )
  }
}

export default TopNavigation
