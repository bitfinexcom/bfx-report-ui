import _includes from 'lodash/includes'
import queryConstants from 'state/query/constants'

const TRADES_TARGETS = [
  queryConstants.MENU_TRADES,
  queryConstants.MENU_CANDLES,
]

const GENERAL_TARGETS = [
  queryConstants.MENU_LEDGERS,
  queryConstants.MENU_TRADES,
  queryConstants.MENU_ORDERS,
  queryConstants.MENU_POSITIONS,
]

const FUNDING_TARGETS = [
  queryConstants.MENU_FLOAN,
  queryConstants.MENU_FOFFER,
  queryConstants.MENU_FCREDIT,
]

const EARNINGS_TARGETS = [
  queryConstants.MENU_FPAYMENT,
  queryConstants.MENU_SPAYMENTS,
  queryConstants.MENU_AFFILIATES_EARNINGS,
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

export const getSections = (target) => {
  if (_includes(TRADES_TARGETS, target)) return TRADES_SECTIONS
  if (_includes(FUNDING_TARGETS, target)) return FUNDING_SECTIONS
  if (_includes(EARNINGS_TARGETS, target)) return EARNINGS_SECTIONS

  return []
}

export default getSections
