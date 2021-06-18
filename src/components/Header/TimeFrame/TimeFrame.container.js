import { connect } from 'react-redux'

import { getTimezone } from 'state/base/selectors'
import { getTimeFrame } from 'state/timeRange/selectors'
import { getIsTimeFrameDialogOpen } from 'state/ui/selectors'
import { toggleTimeFrameDialog } from 'state/ui/actions'

import TimeFrame from './TimeFrame'

const mapStateToProps = state => ({
  ...getTimeFrame(state),
  timezone: getTimezone(state),
  isOpen: getIsTimeFrameDialogOpen(state),
})

const mapDispatchToProps = {
  toggleDialog: toggleTimeFrameDialog,
}

const TimeFrameContainer = connect(mapStateToProps, mapDispatchToProps)(TimeFrame)

export default TimeFrameContainer
