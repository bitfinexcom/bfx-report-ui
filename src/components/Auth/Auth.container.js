import { connect } from 'react-redux'
import Auth from './Auth'
import actions from '../../state/auth/actions'

function mapStateToProps(state = {}) {
  return {
    isValid: state.auth.isValid,
  }
}

const mapDispatchToProps = dispatch => ({
  checkAuth: () =>
    dispatch(actions.checkAuth()),
  setKey: (key, secret) =>
    dispatch(actions.setApiKey(key, secret)),
})

const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth)

export default AuthContainer
