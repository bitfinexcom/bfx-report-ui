import _includes from 'lodash/includes'
import queryConstants from 'state/query/constants'

const TRADES_TARGETS = [
  queryConstants.MENU_TRADES,
  queryConstants.MENU_CANDLES,
]

const FUNDING_TARGETS = [
  queryConstants.MENU_FLOAN,
  queryConstants.MENU_FOFFER,
  queryConstants.MENU_FCREDIT,
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

  return []
}

export default getSections
