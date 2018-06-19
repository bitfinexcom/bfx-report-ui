import { connect } from 'react-redux'
import actions from 'state/auth/actions'
import Auth from './Auth'

function mapStateToProps(state = {}) {
  return {
    apiKey: state.auth.apiKey,
    apiSecret: state.auth.apiSecret,
    isShown: state.auth.isShown,
    authStatus: state.auth.authStatus,
  }
}

const mapDispatchToProps = dispatch => ({
  checkAuth: () => dispatch(actions.checkAuth()),
  setKey: key => dispatch(actions.setApiKey(key)),
  setSecret: secret => dispatch(actions.setApiSecret(secret)),
})

const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth)

export default AuthContainer
