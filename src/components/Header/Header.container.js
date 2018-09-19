import { connect } from 'react-redux'

import authActions from 'state/auth/actions'
import baseActions from 'state/base/actions'
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
})

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)

export default HeaderContainer
