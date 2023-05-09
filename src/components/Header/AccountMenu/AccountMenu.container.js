import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { logout } from 'state/auth/actions'
import { getAuthStatus, getEmail, getIsSubAccsAvailable } from 'state/auth/selectors'
import { toggleExportDialog, togglePreferencesDialog } from 'state/ui/actions'

import AccountMenu from './AccountMenu'

const mapStateToProps = state => ({
  email: getEmail(state),
  authStatus: getAuthStatus(state),
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
)(AccountMenu)
