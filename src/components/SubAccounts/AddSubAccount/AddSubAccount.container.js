import { connect } from 'react-redux'

import { addSubAccounts } from 'state/subAccounts/actions'

import AddSubAccount from './AddSubAccount'

const mapDispatchToProps = {
  addSubAccounts,
}

const AddSubAccountContainer = connect(null, mapDispatchToProps)(AddSubAccount)

export default AddSubAccountContainer
