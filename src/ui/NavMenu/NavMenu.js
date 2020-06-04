import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  Classes,
  Menu,
  MenuDivider,
  MenuItem,
} from '@blueprintjs/core'
import _castArray from 'lodash/castArray'
import _includes from 'lodash/includes'

import queryType from 'state/query/constants'
import { getIcon, getPath, getTarget } from 'state/query/utils'
import { platform } from 'var/config'

import NavMenuPopover from './NavMenuPopover'
import { propTypes, defaultProps } from './NavMenu.props'

const { showFrameworkMode } = platform

const {
  MENU_ACCOUNT_BALANCE,
  MENU_ACCOUNT_SUMMARY,
  MENU_AFFILIATES_EARNINGS,
  MENU_CANDLES,
  MENU_CHANGE_LOGS,
  MENU_CONCENTRATION_RISK,
  MENU_DERIVATIVES,
  MENU_FCREDIT,
  MENU_FEES_REPORT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_FPAYMENT,
  MENU_LEDGERS,
  MENU_LOAN_REPORT,
  MENU_LOGINS,
  MENU_MOVEMENTS,
  MENU_ORDERS,
  MENU_ORDER_TRADES,
  MENU_POSITIONS,
  MENU_POSITIONS_ACTIVE,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_FUNDING,
  MENU_PUBLIC_TRADES,
  MENU_SNAPSHOTS,
  MENU_SPAYMENTS,
  MENU_TAX_REPORT,
  MENU_TICKERS,
  MENU_TRADED_VOLUME,
  MENU_TRADES,
  MENU_WIN_LOSS,
  MENU_WALLETS,
} = queryType

class NavMenu extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  sections = [
    [MENU_LEDGERS, 'ledgers.title'],
    [[MENU_TRADES, MENU_CANDLES], 'trades.title'],
    [[MENU_ORDERS, MENU_ORDER_TRADES], 'orders.title'],
    [MENU_MOVEMENTS, 'movements.title'],
    [[MENU_POSITIONS, MENU_POSITIONS_ACTIVE, MENU_POSITIONS_AUDIT], 'positions.title'],
    [MENU_WALLETS, 'wallets.title'],
    ['divider'],
    [MENU_FOFFER, 'foffer.title'],
    [MENU_FLOAN, 'floan.title'],
    [MENU_FCREDIT, 'fcredit.title'],
    [MENU_FPAYMENT, 'fpayment.title'],
    [MENU_SPAYMENTS, 'spayments.title'],
    [MENU_AFFILIATES_EARNINGS, 'affiliatesearnings.title'],
    ['divider'],
    [MENU_PUBLIC_TRADES, 'publictrades.title'],
    [MENU_PUBLIC_FUNDING, 'publicfunding.title'],
    [MENU_TICKERS, 'tickers.title'],
    [MENU_DERIVATIVES, 'derivatives.title'],
    ['divider', '', !showFrameworkMode],
    [MENU_ACCOUNT_BALANCE, 'accountbalance.title', !showFrameworkMode],
    [MENU_LOAN_REPORT, 'loanreport.title', !showFrameworkMode],
    [MENU_TRADED_VOLUME, 'tradedvolume.title', !showFrameworkMode],
    [MENU_FEES_REPORT, 'feesreport.title', !showFrameworkMode],
    [MENU_WIN_LOSS, 'averagewinloss.title', !showFrameworkMode],
    [MENU_CONCENTRATION_RISK, 'concentrationrisk.title', !showFrameworkMode],
    [MENU_SNAPSHOTS, 'snapshots.title', !showFrameworkMode],
    [MENU_TAX_REPORT, 'taxreport.title', !showFrameworkMode],
    ['divider'],
    [MENU_ACCOUNT_SUMMARY, 'accountsummary.title'],
    [MENU_LOGINS, 'logins.title'],
    [MENU_CHANGE_LOGS, 'changelogs.title'],
  ]

  handleClick = (e, nextTarget) => {
    const { showMenuPopover } = this.props
    e.preventDefault()

    // imitate click to close the popover only in popover view
    if (!showMenuPopover) {
      // dismiss popover mode
      const { parentElement } = e.target
      parentElement.classList.add(Classes.POPOVER_DISMISS)
      parentElement.click()
    }

    const { target, history } = this.props
    if (target === nextTarget) {
      return
    }
    const [path] = _castArray(getPath(nextTarget))
    history.push({
      pathname: path,
      search: window.location.search,
    })
    window.scrollTo(0, 0) // scroll to the top of page on section change
  }

  render() {
    const {
      className,
      history,
      showMenuPopover,
      t,
    } = this.props
    const target = getTarget(history.location.pathname)

    const classes = classNames('bitfinex-nav-menu', className)

    return (
      <Menu large className={classes}>
        {showMenuPopover && window.innerWidth > 375 && window.innerWidth <= 1024 && <NavMenuPopover />}
        {this.sections.map((section, index) => {
          const [type, title, isSkipped] = section

          if (isSkipped) {
            return null
          }

          if (type === 'divider') {
            /* eslint-disable-next-line react/no-array-index-key */
            return <MenuDivider key={index} />
          }


          const types = _castArray(type)
          const mainType = types[0]

          const Icon = getIcon(mainType)
          const [path] = _castArray(getPath(mainType))

          return (
            <MenuItem
              icon={<Icon />}
              key={mainType}
              text={t(title)}
              onClick={(e) => this.handleClick(e, mainType)}
              href={path}
              active={_includes(types, target)}
            />
          )
        })}
      </Menu>
    )
  }
}

export default withTranslation('translations')(NavMenu)
