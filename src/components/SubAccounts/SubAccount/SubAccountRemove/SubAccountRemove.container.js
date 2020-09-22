import { connect } from 'react-redux'

import { removeSubAccount } from 'state/subAccounts/actions'

import SubAccountRemove from './SubAccountRemove'

const mapDispatchToProps = {
  removeSubAccount,
}

const SubAccountRemoveContainer = connect(null, mapDispatchToProps)(SubAccountRemove)

export default SubAccountRemoveContainer
