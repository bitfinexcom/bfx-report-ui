import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { logout } from 'state/auth/actions'
import { setMenuMode } from 'state/base/actions'
import { showCustomDialog } from 'state/ui/actions'
import { getAuthStatus, getIsShown } from 'state/auth/selectors'
import { getMenuMode } from 'state/base/selectors'
import { getEmail } from 'state/query/selectors'

import Header from './Header'

const mapStateToProps = state => ({
  authIsShown: getIsShown(state),
  authStatus: getAuthStatus(state),
  email: getEmail(state),
  menuMode: getMenuMode(state),
})

const mapDispatchToProps = {
  logout,
  setMenuMode,
  showCustomDialog,
}

const HeaderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))

export default HeaderContainer
