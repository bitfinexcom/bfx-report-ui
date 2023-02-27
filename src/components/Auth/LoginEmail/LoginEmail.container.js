import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { signUp, updateAuth } from 'state/auth/actions'
import { getAuthData, getIsLoading, getUsers } from 'state/auth/selectors'

import LoginEmail from './LoginEmail'

const mapStateToProps = state => ({
  authData: getAuthData(state),
  loading: getIsLoading(state),
  users: getUsers(state),
})

const mapDispatchToProps = {
  signUp,
  updateAuth,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(LoginEmail)
