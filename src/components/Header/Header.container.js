import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import authActions from 'state/auth/actions'
import baseActions from 'state/base/actions'
import { showCustomDialog } from 'state/ui/actions'
import { getAuthStatus, getIsShown } from 'state/auth/selectors'
import { getMenuMode } from 'state/base/selectors'

import Header from './Header'

const mapStateToProps = (state = {}) => ({
  authIsShown: getIsShown(state),
  authStatus: getAuthStatus(state),
  menuMode: getMenuMode(state),
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
  setMenuMode: mode => dispatch(baseActions.setMenuMode(mode)),
  showCustomDialog: show => dispatch(showCustomDialog(show)),
})

const HeaderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))

export default HeaderContainer
