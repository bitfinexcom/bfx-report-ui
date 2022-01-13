import { connect } from 'react-redux'

import { signUp, updateAuth } from 'state/auth/actions'
import { getAuthData, getIsLoading, getUsers } from 'state/auth/selectors'

import RegisterSubAccounts from './RegisterSubAccounts'

const mapStateToProps = state => ({
  authData: getAuthData(state),
  loading: getIsLoading(state),
  users: getUsers(state),
})

const mapDispatchToProps = {
  signUp,
  updateAuth,
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterSubAccounts)
