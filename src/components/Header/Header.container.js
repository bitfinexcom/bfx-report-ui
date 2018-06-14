import { connect } from 'react-redux'
import actions from 'state/auth/actions'
import Header from './Header'

const mapDispatchToProps = dispatch => ({
  showAuth: () => dispatch(actions.showAuth()),
})

const HeaderContainer = connect(null, mapDispatchToProps)(Header)

export default HeaderContainer
