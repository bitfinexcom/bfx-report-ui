import { connect } from 'react-redux'

import authActions from 'state/auth/actions'
import baseActions from 'state/base/actions'
import { getAuthStatus, getIsLoading, getIsShown } from 'state/auth/selectors'
import { getApiKey, getApiSecret } from 'state/base/selectors'

import Auth from './Auth'

const mapStateToProps = (state = {}) => ({
  apiKey: getApiKey(state),
  apiSecret: getApiSecret(state),
  isShown: getIsShown(state),
  authStatus: getAuthStatus(state),
  loading: getIsLoading(state),
})

const mapDispatchToProps = dispatch => ({
  checkAuth: () => dispatch(authActions.checkAuth()),
  setKey: key => dispatch(baseActions.setApiKey(key)),
  setSecret: secret => dispatch(baseActions.setApiSecret(secret)),
})

const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth)

export default AuthContainer
