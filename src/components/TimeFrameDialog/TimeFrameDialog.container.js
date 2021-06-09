import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getIsTimeFrameDialogOpen } from 'state/ui/selectors'
import { toggleTimeFrameDialog } from 'state/ui/actions'

import TimeFrameDialog from './TimeFrameDialog'

const mapStateToProps = state => ({
  isOpen: getIsTimeFrameDialogOpen(state),
})

const mapDispatchToProps = {
  toggleDialog: toggleTimeFrameDialog,
}

const TimeFrameDialogContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TimeFrameDialog))

export default TimeFrameDialogContainer
