import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import {
  updateAuth,
  signUpEmail,
  showOtpLogin,
  recoverPassword,
  recoverPasswordOtp,
} from 'state/auth/actions'
import {
  getAuthData,
  getIsLoading,
  getShowOtpLogin,
} from 'state/auth/selectors'

import PasswordRecovery from './PasswordRecovery'

const mapStateToProps = state => ({
  authData: getAuthData(state),
  loading: getIsLoading(state),
  isOtpLoginShown: getShowOtpLogin(state),
})

const mapDispatchToProps = {
  updateAuth,
  signUpEmail,
  showOtpLogin,
  recoverPassword,
  recoverPasswordOtp,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(PasswordRecovery)
