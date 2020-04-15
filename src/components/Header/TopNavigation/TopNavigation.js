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
import TimeRange from 'ui/TimeRange'
import timeRangeTypes from 'state/timeRange/constants'

import SyncMode from '../SyncMode'
import TimeFrameShortcut from '../TimeFrameShortcut'
import { propTypes, defaultProps } from './TopNavigation.props'

const HELP_LINK = 'https://support.bitfinex.com/hc/en-us/articles/360008951853'

const formatUsername = (username = '') => (username.includes('@') ? `${username.split('@')[0]}` : username)

class TopNavigation extends PureComponent {
  state = {
    isOpen: false,
  }

  openHelp = () => window.open(HELP_LINK)

  togglePopover = (isOpen) => {
    this.setState({ isOpen })

    const headerBrand = document.getElementsByClassName('header-brand')[0]
    if (isOpen) {
      headerBrand.style.display = 'none'
    } else {
      headerBrand.style.display = 'inline-block'
    }
  }

  render() {
    const {
      email,
      logout,
      t,
      togglePrefDialog,
    } = this.props
    const { isOpen } = this.state

    return (
      <div className={classNames('top-navigation', { 'account-menu--no-email': !email })}>
        <Popover
          minimal
          autoFocus={false}
          position={Position.BOTTOM}
          portalClassName='top-navigation-portal'
          onOpening={() => this.togglePopover(true)}
          onClosing={() => this.togglePopover(false)}
          content={(
            <div className='top-navigation-content'>
              <Menu>
                <MenuItem
                  className='bp3-menu-item--timeframe'
                  icon={<Icon.CALENDAR />}
                  shouldDismissPopover={false}
                  text={<TimeRange icon={false} />}
                />
                <MenuItem
                  className='bp3-menu-item--subitem'
                  text={t('timeframe.custom_time')}
                />
                <MenuItem
                  className='bp3-menu-item--subitem'
                  shouldDismissPopover={false}
                  text={(
                    <TimeFrameShortcut
                      icon={false}
                      title='timeframe.2w'
                      type={timeRangeTypes.LAST_2WEEKS}
                    />
                  )}
                />
                <MenuItem
                  className='bp3-menu-item--subitem'
                  shouldDismissPopover={false}
                  text={(
                    <TimeFrameShortcut
                      icon={false}
                      title='timeframe.past_month'
                      type={timeRangeTypes.PAST_MONTH}
                    />
                  )}
                />
                <MenuItem
                  shouldDismissPopover={false}
                  text={<SyncMode />}
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
                  onClick={this.openHelp}
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
          className='bitfinex-dropdown'
        >
          <span>
            {isOpen
              ? <Icon.CLOSE />
              : <Icon.HAMBURGER_MENU />}
            {isOpen && <span className='top-navigation-title'>Top Navigation</span>}
          </span>
        </Popover>
      </div>
    )
  }
}

TopNavigation.propTypes = propTypes
TopNavigation.defaultProps = defaultProps

export default withTranslation('translations')(TopNavigation)
