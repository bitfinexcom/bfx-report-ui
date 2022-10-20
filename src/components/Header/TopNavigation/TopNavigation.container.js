import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { getEmail } from 'state/auth/selectors'
import { getWindowWidth } from 'state/ui/selectors'
import { togglePreferencesDialog } from 'state/ui/actions'
import { logout } from 'state/auth/actions'

import TopNavigation from './TopNavigation'

const mapStateToProps = state => ({
  email: getEmail(state),
  windowWidth: getWindowWidth(state),
})

const mapDispatchToProps = {
  logout,
  togglePrefDialog: togglePreferencesDialog,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(TopNavigation)
