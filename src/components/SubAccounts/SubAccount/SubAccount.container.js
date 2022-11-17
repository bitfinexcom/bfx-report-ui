import { connect } from 'react-redux'

import { getSubAccountsLoading } from 'state/auth/selectors'
import { addSubAccount, updateSubAccount } from 'state/subAccounts/actions'

import SubAccount from './SubAccount'

const mapStateToProps = state => ({
  isSubAccountsLoading: getSubAccountsLoading(state),
})

const mapDispatchToProps = {
  addSubAccount,
  updateSubAccount,
}

const SubAccountContainer = connect(mapStateToProps, mapDispatchToProps)(SubAccount)

export default SubAccountContainer
