import { connect } from 'react-redux'

import { addSubAccounts } from 'state/subAccounts/actions'

import AddSubAccount from './CreateSubAccount'

const mapDispatchToProps = {
  addSubAccounts,
}

const CreateSubAccountContainer = connect(null, mapDispatchToProps)(AddSubAccount)

export default CreateSubAccountContainer
