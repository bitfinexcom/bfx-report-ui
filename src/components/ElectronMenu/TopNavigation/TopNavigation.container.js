import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import {
  getEmail,
  getLocalUsername,
  getIsSubAccsAvailable,
} from 'state/auth/selectors'
import { getWindowWidth } from 'state/ui/selectors'
import { toggleExportDialog, togglePreferencesDialog } from 'state/ui/actions'
import { logout } from 'state/auth/actions'

import TopNavigation from './TopNavigation'

const mapStateToProps = state => ({
  email: getEmail(state),
  windowWidth: getWindowWidth(state),
  localUsername: getLocalUsername(state),
  isSubAccsAvailable: getIsSubAccsAvailable(state),
})

const mapDispatchToProps = {
  logout,
  toggleExportDialog,
  togglePrefDialog: togglePreferencesDialog,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(TopNavigation)
