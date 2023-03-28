import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import {
  signIn,
  signInOtp,
  updateAuth,
  signUpEmail,
  showOtpLogin,
} from 'state/auth/actions'
import {
  getAuthData,
  getIsLoading,
  getUsers,
  getUsersLoaded,
  getIsSubAccount,
  getShowOtpLogin,
  getUserShouldReLogin,
} from 'state/auth/selectors'
import { getIsElectronBackendLoaded } from 'state/ui/selectors'

import SignIn from './SignIn'

const mapStateToProps = state => ({
  authData: getAuthData(state),
  isElectronBackendLoaded: getIsElectronBackendLoaded(state),
  isUsersLoaded: getUsersLoaded(state),
  loading: getIsLoading(state),
  users: getUsers(state),
  isSubAccount: getIsSubAccount(state),
  isOtpLoginShown: getShowOtpLogin(state),
  userShouldReLogin: getUserShouldReLogin(state),
})

const mapDispatchToProps = {
  signIn,
  signInOtp,
  updateAuth,
  signUpEmail,
  showOtpLogin,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(SignIn)
