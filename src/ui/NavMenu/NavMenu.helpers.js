import config from 'config'
import queryType from 'state/query/constants'

import constants from './NavMenu.constants'

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

const {
  MENU_MY_ACCOUNT,
  MENU_MY_HISTORY,
  MENU_MERCHANT_HISTORY,
  MENU_MARKET_HISTORY,
} = constants

export const getSubSections = (menuType, isTurkishSite) => {
  switch (menuType) {
    case MENU_MY_ACCOUNT:
      return [
        [MENU_ACCOUNT_SUMMARY, 'accountsummary.title'],
        [MENU_ACCOUNT_BALANCE, 'accountbalance.title', !showFrameworkMode],
        [MENU_WEIGHTED_AVERAGES, 'navItems.myAccount.analysisStat', !showFrameworkMode],
        [MENU_SNAPSHOTS, 'snapshots.title', !showFrameworkMode],
        [MENU_TAX_REPORT, 'taxreport.title', !showFrameworkMode],
      ]
    case MENU_MY_HISTORY:
      return [
        [MENU_LEDGERS, 'navItems.myHistory.general'],
        [MENU_FOFFER, 'navItems.myHistory.funding', isTurkishSite],
        [MENU_FPAYMENT, 'navItems.myHistory.earnings', isTurkishSite],
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

export const getSections = (isTurkishSite) => [
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
  [MENU_TICKERS, 'tickers.spot'],
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
