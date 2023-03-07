import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { signUp, signUpEmail, updateAuth } from 'state/auth/actions'
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
  showOtpLogin: getShowOtpLogin(state),
})

const mapDispatchToProps = {
  signUp,
  signUpEmail,
  updateAuth,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(SignUp)
