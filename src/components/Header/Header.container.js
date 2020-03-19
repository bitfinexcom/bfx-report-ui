import { connect } from 'react-redux'

import { logout } from 'state/auth/actions'
import { getAuthStatus, getIsShown } from 'state/auth/selectors'
import { getEmail } from 'state/query/selectors'

import Header from './Header'

const mapStateToProps = state => ({
  authIsShown: getIsShown(state),
  authStatus: getAuthStatus(state),
  email: getEmail(state),
})

const mapDispatchToProps = {
  logout,
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)

export default HeaderContainer
