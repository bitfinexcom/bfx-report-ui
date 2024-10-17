import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import {
  signIn,
  signUp,
  signUpOtp,
  updateAuth,
  signUpEmail,
  showOtpLogin,
  disableAuthBtn,
} from 'state/auth/actions'
import { updateStatus } from 'state/status/actions'
import {
  getUsers,
  getAuthData,
  getIsLoading,
  getShowOtpLogin,
} from 'state/auth/selectors'

import SignUp from './SignUp'

const mapStateToProps = state => ({
  users: getUsers(state),
  authData: getAuthData(state),
  loading: getIsLoading(state),
  isOtpLoginShown: getShowOtpLogin(state),
})

const mapDispatchToProps = {
  signIn,
  signUp,
  signUpOtp,
  updateAuth,
  signUpEmail,
  showOtpLogin,
  updateStatus,
  disableAuthBtn,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(SignUp)
