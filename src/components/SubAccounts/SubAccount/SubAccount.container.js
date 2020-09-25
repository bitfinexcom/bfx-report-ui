import { connect } from 'react-redux'

import { addSubAccount, updateSubAccount } from 'state/subAccounts/actions'

import SubAccount from './SubAccount'

const mapDispatchToProps = {
  addSubAccount,
  updateSubAccount,
}

const SubAccountContainer = connect(null, mapDispatchToProps)(SubAccount)

export default SubAccountContainer
