import queryConstants from 'state/query/constants'

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

export default {
  FUNDING_SECTIONS,
}
