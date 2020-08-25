import { connect } from 'react-redux'

import { signIn, updateAuth } from 'state/auth/actions'
import {
  getAuthData, getIsLoading, getUsers, getUsersLoaded,
} from 'state/auth/selectors'
import { getIsElectronBackendLoaded } from 'state/ui/selectors'

import SignIn from './SignIn'

const mapStateToProps = state => ({
  authData: getAuthData(state),
  isElectronBackendLoaded: getIsElectronBackendLoaded(state),
  isUsersLoaded: getUsersLoaded(state),
  loading: getIsLoading(state),
  users: getUsers(state),
})

const mapDispatchToProps = {
  signIn,
  updateAuth,
}

const SignInContainer = connect(mapStateToProps, mapDispatchToProps)(SignIn)

export default SignInContainer
