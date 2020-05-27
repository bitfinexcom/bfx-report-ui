import { connect } from 'react-redux'

import { getEmail } from 'state/auth/selectors'
import { logout } from 'state/auth/actions'
import { toggleExportDialog, togglePreferencesDialog } from 'state/ui/actions'

import AccountMenu from './AccountMenu'

const mapStateToProps = state => ({
  email: getEmail(state),
})

const mapDispatchToProps = {
  logout,
  toggleExportDialog,
  togglePrefDialog: togglePreferencesDialog,
}

const AccountMenuContainer = connect(mapStateToProps, mapDispatchToProps)(AccountMenu)

export default AccountMenuContainer
