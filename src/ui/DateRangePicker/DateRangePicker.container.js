import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getIsTimeFrameDialogOpen } from 'state/ui/selectors'
import { setTimeRange } from 'state/timeRange/actions'
import { updateSuccessStatus } from 'state/status/actions'
import { getTimeRange } from 'state/timeRange/selectors'
import { toggleTimeFrameDialog } from 'state/ui/actions'

import DateRangePicker from './DateRangePicker'

const mapStateToProps = (state, ownProps) => {
  const { controlledFromRedux, isOpen } = ownProps
  const { range, start, end } = getTimeRange(state)

  return {
    isOpen: controlledFromRedux ? getIsTimeFrameDialogOpen(state) : isOpen,
    range,
    start,
    end,
  }
}

const mapDispatchToProps = {
  setTimeRange,
  toggleTimeFrameDialog,
  updateSuccessStatus,
}

const DateRangePickerContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(DateRangePicker))

export default DateRangePickerContainer
