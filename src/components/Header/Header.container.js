import { connect } from 'react-redux'
import actions from 'state/auth/actions'
import Header from './Header'

function mapStateToProps(state = {}) {
  return {
    authIsShown: state.auth.isShown,
    authStatus: state.auth.authStatus,
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout()),
})

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)

export default HeaderContainer
