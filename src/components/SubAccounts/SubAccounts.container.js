import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getAuthData, getUsers } from 'state/auth/selectors'

import SubAccounts from './SubAccounts'

const mapStateToProps = state => ({
  authData: getAuthData(state),
  users: getUsers(state),
})

const SubAccountsContainer = withRouter(connect(mapStateToProps)(SubAccounts))

export default SubAccountsContainer
