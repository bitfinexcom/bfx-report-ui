import _includes from 'lodash/includes'
import queryConstants from 'state/query/constants'

const TRADES_TARGETS = [
  queryConstants.MENU_TRADES,
  queryConstants.MENU_CANDLES,
]

const POSITIONS_TARGETS = [
  queryConstants.MENU_POSITIONS,
  queryConstants.MENU_POSITIONS_ACTIVE,
  queryConstants.MENU_POSITIONS_AUDIT,
]

export const ANALYSIS_STAT_TARGETS = [
  queryConstants.MENU_WEIGHTED_AVERAGES,
  queryConstants.MENU_TRADED_VOLUME,
  queryConstants.MENU_WIN_LOSS,
  queryConstants.MENU_CONCENTRATION_RISK,
  queryConstants.MENU_LOAN_REPORT,
  queryConstants.MENU_FEES_REPORT,
]

export const GENERAL_TARGETS = [
  queryConstants.MENU_LEDGERS,
  queryConstants.MENU_TRADES,
  queryConstants.MENU_ORDERS,
  queryConstants.MENU_POSITIONS,
]

export const FUNDING_TARGETS = [
  queryConstants.MENU_FLOAN,
  queryConstants.MENU_FOFFER,
  queryConstants.MENU_FCREDIT,
]

export const EARNINGS_TARGETS = [
  queryConstants.MENU_FPAYMENT,
  queryConstants.MENU_SPAYMENTS,
  queryConstants.MENU_AFFILIATES_EARNINGS,
]

export const WALLETS_TARGETS = [
  queryConstants.MENU_WALLETS,
  queryConstants.MENU_MOVEMENTS,
]


export const ANALYSIS_STAT_SECTIONS = [
  {
    targetSection: queryConstants.MENU_WEIGHTED_AVERAGES,
    description: 'navItems.myAccount.analysisStatTabs.weightedAvgs',
  },
  {
    targetSection: queryConstants.MENU_TRADED_VOLUME,
    description: 'navItems.myAccount.analysisStatTabs.volume',
  },
  {
    targetSection: queryConstants.MENU_WIN_LOSS,
    description: 'navItems.myAccount.analysisStatTabs.winLoss',
  },
  {
    targetSection: queryConstants.MENU_CONCENTRATION_RISK,
    description: 'navItems.myAccount.analysisStatTabs.conRisk',
  },
  {
    targetSection: queryConstants.MENU_LOAN_REPORT,
    description: 'navItems.myAccount.analysisStatTabs.loan',
  },
  {
    targetSection: queryConstants.MENU_FEES_REPORT,
    description: 'navItems.myAccount.analysisStatTabs.fees',
  },
]

export const GENERAL_SECTIONS = [
  {
    targetSection: queryConstants.MENU_LEDGERS,
    description: 'navItems.myHistory.generalTabs.ledgers',
  },
  {
    targetSection: queryConstants.MENU_TRADES,
    description: 'navItems.myHistory.generalTabs.trades',
  },
  {
    targetSection: queryConstants.MENU_ORDERS,
    description: 'navItems.myHistory.generalTabs.orders',
  },
  {
    targetSection: queryConstants.MENU_POSITIONS,
    description: 'navItems.myHistory.generalTabs.positions',
  },
]

export const FUNDING_SECTIONS = [
  {
    targetSection: queryConstants.MENU_FOFFER,
    description: 'navItems.myHistory.fundingTabs.bidsOffers',
  },
  {
    targetSection: queryConstants.MENU_FLOAN,
    description: 'navItems.myHistory.fundingTabs.loans',
  },
  {
    targetSection: queryConstants.MENU_FCREDIT,
    description: 'navItems.myHistory.fundingTabs.credits',
  },
]

export const EARNINGS_SECTIONS = [
  {
    targetSection: queryConstants.MENU_FPAYMENT,
    description: 'navItems.myHistory.earningsTabs.funding',
  },
  {
    targetSection: queryConstants.MENU_SPAYMENTS,
    description: 'navItems.myHistory.earningsTabs.staking',
  },
  {
    targetSection: queryConstants.MENU_AFFILIATES_EARNINGS,
    description: 'navItems.myHistory.earningsTabs.affiliates',
  },
]

export const TRADES_SECTIONS = [
  {
    targetSection: queryConstants.MENU_TRADES,
    description: 'trades.title',
  },
  {
    targetSection: queryConstants.MENU_CANDLES,
    description: 'candles.title',
  },
]

export const POSITIONS_SECTIONS = [
  {
    targetSection: queryConstants.MENU_POSITIONS,
    description: 'positions.closed',
  },
  {
    targetSection: queryConstants.MENU_POSITIONS_ACTIVE,
    description: 'positions.active',
  },
]

export const WALLETS_SECTIONS = [
  {
    targetSection: queryConstants.MENU_WALLETS,
    description: 'navItems.myHistory.walletsTabs.balances',
  },
  {
    targetSection: queryConstants.MENU_MOVEMENTS,
    description: 'navItems.myHistory.walletsTabs.movements',
  },
]

export const getSections = (target, hasSubSections) => {
  if (_includes(TRADES_TARGETS, target) && hasSubSections) return TRADES_SECTIONS
  if (_includes(POSITIONS_TARGETS, target) && hasSubSections) return POSITIONS_SECTIONS
  if (_includes(ANALYSIS_STAT_TARGETS, target)) return ANALYSIS_STAT_SECTIONS
  if (_includes(GENERAL_TARGETS, target)) return GENERAL_SECTIONS
  if (_includes(FUNDING_TARGETS, target)) return FUNDING_SECTIONS
  if (_includes(EARNINGS_TARGETS, target)) return EARNINGS_SECTIONS
  if (_includes(WALLETS_TARGETS, target)) return WALLETS_SECTIONS

  return []
}

export default getSections
