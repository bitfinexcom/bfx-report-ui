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

export const getSections = (target, hasSubSections) => {
  if (_includes(TRADES_TARGETS, target) && hasSubSections) return TRADES_SECTIONS
  if (_includes(POSITIONS_TARGETS, target) && hasSubSections) return POSITIONS_SECTIONS
  if (_includes(GENERAL_TARGETS, target)) return GENERAL_SECTIONS
  if (_includes(FUNDING_TARGETS, target)) return FUNDING_SECTIONS
  if (_includes(EARNINGS_TARGETS, target)) return EARNINGS_SECTIONS

  return []
}

export default getSections
