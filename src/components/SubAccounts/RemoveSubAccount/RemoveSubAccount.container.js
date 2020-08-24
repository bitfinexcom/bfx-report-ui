import { connect } from 'react-redux'

import { removeSubAccount } from 'state/subAccounts/actions'

import RemoveSubAccount from './RemoveSubAccount'

const mapDispatchToProps = {
  removeSubAccount,
}

const RemoveSubAccountContainer = connect(null, mapDispatchToProps)(RemoveSubAccount)

export default RemoveSubAccountContainer
