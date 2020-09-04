import { connect } from 'react-redux'

import { recoverPassword, updateAuth } from 'state/auth/actions'
import { getAuthData, getIsLoading } from 'state/auth/selectors'

import PasswordRecovery from './PasswordRecovery'

const mapStateToProps = state => ({
  authData: getAuthData(state),
  loading: getIsLoading(state),
})

const mapDispatchToProps = {
  recoverPassword,
  updateAuth,
}

const PasswordRecoveryContainer = connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery)

export default PasswordRecoveryContainer
