import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchSubAccounts, removeSubAccount } from 'state/subAccounts/actions'
import { subUsers } from 'state/subAccounts/selectors'
import { getAuthData, getUsers } from 'state/auth/selectors'

import SubAccounts from './SubAccounts'

const mapStateToProps = state => ({
  authData: getAuthData(state),
  subUsers: subUsers(state),
  users: getUsers(state),
})

const mapDispatchToProps = {
  fetchSubAccounts,
  removeSubAccount,
}

const SubAccountsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SubAccounts))

export default SubAccountsContainer
