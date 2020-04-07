import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setTimeRange } from 'state/timeRange/actions'
import { updateWarningStatus } from 'state/status/actions'
import { getTimeRange } from 'state/timeRange/selectors'

import DateRangePicker from './DateRangePicker'

const mapStateToProps = state => {
  const { range, start, end } = getTimeRange(state)

  return {
    range,
    start,
    end,
  }
}

const mapDispatchToProps = {
  setTimeRange,
  updateWarningStatus,
}

const DateRangePickerContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(DateRangePicker))

export default DateRangePickerContainer
