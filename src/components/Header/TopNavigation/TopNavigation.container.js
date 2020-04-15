import { connect } from 'react-redux'

import { getEmail } from 'state/query/selectors'
import { togglePreferencesDialog } from 'state/ui/actions'
import { logout } from 'state/auth/actions'

import TopNavigation from './TopNavigation'

const mapStateToProps = state => ({
  email: getEmail(state),
})

const mapDispatchToProps = {
  logout,
  togglePrefDialog: togglePreferencesDialog,
}

const TopNavigationContainer = connect(mapStateToProps, mapDispatchToProps)(TopNavigation)

export default TopNavigationContainer
