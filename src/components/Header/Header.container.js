import { connect } from 'react-redux'

import authActions from 'state/auth/actions'
import { getAuthStatus, getIsShown } from 'state/auth/selectors'

import Header from './Header'

const mapStateToProps = (state = {}) => ({
  authIsShown: getIsShown(state),
  authStatus: getAuthStatus(state),
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
})

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)

export default HeaderContainer
