import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getSyncMode } from 'state/sync/selectors'
import { toggleFrameworkDialog, proceedFrameworkRequest } from 'state/ui/actions'

import FrameworkDialog from './FrameworkDialog'

const mapStateToProps = (state = {}) => ({
  syncMode: getSyncMode(state),
})

const mapDispatchToProps = dispatch => ({
  toggleDialog: () => dispatch(toggleFrameworkDialog()),
  proceedRequest: options => dispatch(proceedFrameworkRequest(options)),
})

const FrameworkDialogContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FrameworkDialog))

export default FrameworkDialogContainer
