import { compose } from 'redux'
import { connect } from 'react-redux'

import { withTranslation } from 'react-i18next'
import { getIsNavigationDrawerOpen } from 'state/ui/selectors'

import NavMenuDrawer from './NavMenuDrawer'

const mapStateToProps = state => ({
  isNavigationDrawerOpen: getIsNavigationDrawerOpen(state),
})

export default compose(
  withTranslation('translations'),
  connect(mapStateToProps),
)(NavMenuDrawer)
