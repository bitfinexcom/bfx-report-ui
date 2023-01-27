import _includes from 'lodash/includes'
import queryConstants from 'state/query/constants'

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

export const getSections = (target) => {
  if (_includes(FUNDING_TARGETS, target)) return FUNDING_SECTIONS

  return []
}

export default getSections
