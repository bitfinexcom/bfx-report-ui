import { connect } from 'react-redux'

import authActions from 'state/auth/actions'
import baseActions from 'state/base/actions'

import Auth from './Auth'

function mapStateToProps(state = {}) {
  return {
    apiKey: state.base.apiKey,
    apiSecret: state.base.apiSecret,
    isShown: state.auth.isShown,
    authStatus: state.auth.authStatus,
  }
}

const mapDispatchToProps = dispatch => ({
  checkAuth: () => dispatch(authActions.checkAuth()),
  setKey: key => dispatch(baseActions.setApiKey(key)),
  setSecret: secret => dispatch(baseActions.setApiSecret(secret)),
})

const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth)

export default AuthContainer
