import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { recoverPassword, updateAuth } from 'state/auth/actions'
import { getAuthData, getIsLoading } from 'state/auth/selectors'

import PasswordRecovery from './PasswordRecovery'

const mapStateToProps = state => ({
  authData: getAuthData(state),
  loading: getIsLoading(state),
})

const mapDispatchToProps = {
  updateAuth,
  recoverPassword,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(PasswordRecovery)
