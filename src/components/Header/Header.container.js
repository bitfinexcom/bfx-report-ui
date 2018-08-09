import { connect } from 'react-redux'

import authActions from 'state/auth/actions'

import Header from './Header'

function mapStateToProps(state = {}) {
  return {
    authIsShown: state.auth.isShown,
    authStatus: state.auth.authStatus,
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
})

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)

export default HeaderContainer
