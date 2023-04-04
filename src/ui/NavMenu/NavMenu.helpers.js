import React from 'react'

import Icons from 'icons'
import config from 'config'
import queryType from 'state/query/constants'
import {
  ANALYSIS_STAT_TARGETS,
  GENERAL_TARGETS,
  FUNDING_TARGETS,
  EARNINGS_TARGETS,
} from 'ui/SectionSwitch/SectionSwitch.helpers'

import constants from './NavMenu.constants'

const { showFrameworkMode } = config

const {
  MENU_ACCOUNT_BALANCE,
  MENU_ACCOUNT_SUMMARY,
  MENU_DERIVATIVES,
  MENU_FOFFER,
  MENU_FPAYMENT,
  MENU_INVOICES,
  MENU_LEDGERS,
  MENU_PUBLIC_FUNDING,
  MENU_PUBLIC_TRADES,
  MENU_SNAPSHOTS,
  MENU_TAX_REPORT,
  MENU_TICKERS,
  MENU_WALLETS,
  MENU_WEIGHTED_AVERAGES,
} = queryType

const {
  MENU_MY_ACCOUNT,
  MENU_MY_HISTORY,
  MENU_MERCHANT_HISTORY,
  MENU_MARKET_HISTORY,
} = constants

export const getMenuItemChevron = (isActive) => (
  isActive
    ? <Icons.CHEVRON_UP />
    : <Icons.CHEVRON_DOWN />
)

export const getSections = (menuType, isTurkishSite) => {
  switch (menuType) {
    case MENU_MY_ACCOUNT:
      return [
        [MENU_ACCOUNT_SUMMARY, 'navItems.myAccount.summary'],
        [MENU_ACCOUNT_BALANCE, 'navItems.myAccount.balance', !showFrameworkMode],
        [MENU_WEIGHTED_AVERAGES, 'navItems.myAccount.analysisStat', false, ANALYSIS_STAT_TARGETS],
        [MENU_SNAPSHOTS, 'snapshots.title', !showFrameworkMode],
        [MENU_TAX_REPORT, 'taxreport.title', !showFrameworkMode],
      ]
    case MENU_MY_HISTORY:
      return [
        [MENU_LEDGERS, 'navItems.myHistory.general', false, GENERAL_TARGETS],
        [MENU_FOFFER, 'navItems.myHistory.funding', isTurkishSite, FUNDING_TARGETS],
        [MENU_FPAYMENT, 'navItems.myHistory.earnings', isTurkishSite, EARNINGS_TARGETS],
        [MENU_WALLETS, 'wallets.title'],
      ]
    case MENU_MERCHANT_HISTORY:
      return [
        [MENU_INVOICES, 'invoices.title', isTurkishSite],
      ]
    case MENU_MARKET_HISTORY:
      return [
        [MENU_PUBLIC_TRADES, 'navItems.marketHistory.trades'],
        [MENU_PUBLIC_FUNDING, 'navItems.marketHistory.funding', isTurkishSite],
        [MENU_TICKERS, 'navItems.marketHistory.spot'],
        [MENU_DERIVATIVES, 'navItems.marketHistory.derivatives', isTurkishSite],
      ]
    default:
      return []
  }
}
