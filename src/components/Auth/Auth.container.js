import { connect } from 'react-redux'

import { checkAuth } from 'state/auth/actions'
import { setApiKey, setApiSecret } from 'state/base/actions'
import { getAuthStatus, getIsLoading, getIsShown } from 'state/auth/selectors'
import { getApiKey, getApiSecret } from 'state/base/selectors'

import Auth from './Auth'

const mapStateToProps = state => ({
  apiKey: getApiKey(state),
  apiSecret: getApiSecret(state),
  isShown: getIsShown(state),
  authStatus: getAuthStatus(state),
  loading: getIsLoading(state),
})

const mapDispatchToProps = {
  checkAuth,
  setKey: setApiKey,
  setSecret: setApiSecret,
}

const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth)

export default AuthContainer
