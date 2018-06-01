import { connect } from 'react-redux'
import Auth from './Auth'
import actions from '../../state/auth/actions'

// function mapStateToProps(state = {}, ownProps = {}) {
//   return state;
// }

const mapDispatchToProps = dispatch => ({
  setKey: (key) => {
    dispatch(actions.setApiKey(key))
  },
})

const AuthContainer = connect(null, mapDispatchToProps)(Auth)

export default AuthContainer
