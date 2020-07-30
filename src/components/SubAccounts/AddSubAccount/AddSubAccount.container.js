import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { addSubAccounts } from 'state/subAccounts/actions'

import AddSubAccount from './AddSubAccount'

const mapDispatchToProps = {
  addSubAccounts,
}

const AddSubAccountContainer = withRouter(connect(null, mapDispatchToProps)(AddSubAccount))

export default AddSubAccountContainer
