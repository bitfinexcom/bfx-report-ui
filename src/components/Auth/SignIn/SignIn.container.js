import { connect } from 'react-redux'

import { signIn, updateAuth } from 'state/auth/actions'
import { getAuthData, getIsLoading } from 'state/auth/selectors'

import SignUp from './SignIn'

const mapStateToProps = state => ({
  authData: getAuthData(state),
  loading: getIsLoading(state),
})

const mapDispatchToProps = {
  signIn,
  updateAuth,
}

const SignInContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp)

export default SignInContainer
