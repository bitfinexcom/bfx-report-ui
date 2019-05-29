import { connect } from 'react-redux'

import { updateWarningStatus } from 'state/status/actions'

import CustomDialog from './CustomDialog'

const mapDispatchToProps = {
  updateWarningStatus,
}

const CustomDialogContainer = connect(null, mapDispatchToProps)(CustomDialog)

export default CustomDialogContainer
