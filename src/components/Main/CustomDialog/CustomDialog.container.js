import { connect } from 'react-redux'

import { updateWarningStatus } from 'state/status/actions'

import CustomDialog from './CustomDialog'

const mapDispatchToProps = dispatch => ({
  updateWarningStatus: msg => dispatch(updateWarningStatus(msg)),
})

const CustomDialogContainer = connect(null, mapDispatchToProps)(CustomDialog)

export default CustomDialogContainer
