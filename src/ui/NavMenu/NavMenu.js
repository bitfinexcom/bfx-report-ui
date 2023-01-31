import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Classes,
  Menu,
  MenuDivider,
  MenuItem,
} from '@blueprintjs/core'
import _map from 'lodash/map'
import _includes from 'lodash/includes'
import _castArray from 'lodash/castArray'

import config from 'config'
import queryType from 'state/query/constants'
import { getIcon, getPath, getTarget } from 'state/query/utils'

import NavMenuPopover from './NavMenuPopover'

const { showFrameworkMode } = config

const {
  MENU_ACCOUNT_BALANCE,
  MENU_ACCOUNT_SUMMARY,
  // MENU_AFFILIATES_EARNINGS,
  MENU_CANDLES,
  MENU_CHANGE_LOGS,
  MENU_CONCENTRATION_RISK,
  MENU_DERIVATIVES,
  // MENU_FCREDIT,
  MENU_FEES_REPORT,
  // MENU_FLOAN,
  MENU_FOFFER,
  MENU_FPAYMENT,
  MENU_INVOICES,
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
  // MENU_SPAYMENTS,
  MENU_SUB_ACCOUNTS,
  MENU_TAX_REPORT,
  MENU_TICKERS,
  MENU_TRADED_VOLUME,
  MENU_TRADES,
  MENU_WIN_LOSS,
  MENU_WALLETS,
  MENU_WEIGHTED_AVERAGES,
} = queryType

class NavMenu extends PureComponent {
  static propTypes = {
    target: PropTypes.string,
    className: PropTypes.string,
    history: PropTypes.shape({
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string.isRequired,
      }).isRequired,
      push: PropTypes.func.isRequired,
    }).isRequired,
    showMenuPopover: PropTypes.bool,
    t: PropTypes.func.isRequired,
    isTurkishSite: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    className: '',
    target: undefined,
    showMenuPopover: true,
  }

  getSections = (isTurkishSite) => [
    [MENU_LEDGERS, 'ledgers.title'],
    [MENU_INVOICES, 'invoices.title', isTurkishSite],
    [[MENU_TRADES, MENU_CANDLES], 'trades.title'],
    [[MENU_ORDERS, MENU_ORDER_TRADES], 'orders.title'],
    [MENU_MOVEMENTS, 'movements.title'],
    [[MENU_POSITIONS, MENU_POSITIONS_ACTIVE, MENU_POSITIONS_AUDIT], 'positions.title'],
    [MENU_WALLETS, 'wallets.title'],
    ['divider'],
    [MENU_FOFFER, 'navItems.myHistory.funding', isTurkishSite],
    // [MENU_FLOAN, 'floan.title', isTurkishSite],
    // [MENU_FCREDIT, 'fcredit.title', isTurkishSite],
    [MENU_FPAYMENT, 'navItems.myHistory.earnings', isTurkishSite],
    // [MENU_SPAYMENTS, 'spayments.title', isTurkishSite],
    // [MENU_AFFILIATES_EARNINGS, 'affiliatesearnings.title'],
    ['divider', '', isTurkishSite],
    [MENU_PUBLIC_TRADES, 'publictrades.title'],
    [MENU_PUBLIC_FUNDING, 'publicfunding.title', isTurkishSite],
    [MENU_TICKERS, 'tickers.title'],
    [MENU_DERIVATIVES, 'derivatives.title', isTurkishSite],
    ['divider', '', !showFrameworkMode],
    [MENU_ACCOUNT_BALANCE, 'accountbalance.title', !showFrameworkMode],
    [MENU_WEIGHTED_AVERAGES, 'weightedaverages.title', !showFrameworkMode],
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
    [MENU_SUB_ACCOUNTS, 'subaccounts.title', !showFrameworkMode],
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
      t,
      history,
      className,
      isTurkishSite,
      showMenuPopover,
    } = this.props
    const target = getTarget(history.location.pathname, false)

    const classes = classNames('bitfinex-nav-menu', className)

    return (
      <Menu large className={classes}>
        {showMenuPopover && window.innerWidth > 390 && window.innerWidth <= 1024 && <NavMenuPopover />}
        {_map(this.getSections(isTurkishSite), (section, index) => {
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
              href={path}
              key={mainType}
              text={t(title)}
              icon={<Icon />}
              active={_includes(types, target)}
              onClick={(e) => this.handleClick(e, mainType)}
            />
          )
        })}
      </Menu>
    )
  }
}

export default NavMenu
