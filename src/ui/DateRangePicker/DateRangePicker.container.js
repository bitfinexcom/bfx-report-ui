import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setCustomTimeRange } from 'state/timeRange/actions'
import { updateWarningStatus } from 'state/status/actions'

import CustomDialog from './DateRangePicker'

const mapDispatchToProps = {
  setCustomTimeRange,
  updateWarningStatus,
}

const DateRangePickerContainer = withRouter(connect(null, mapDispatchToProps)(CustomDialog))

export default DateRangePickerContainer
