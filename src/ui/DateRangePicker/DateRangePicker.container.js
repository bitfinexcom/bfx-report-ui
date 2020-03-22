import { connect } from 'react-redux'

import { setCustomTimeRange } from 'state/query/actions'
import { updateWarningStatus } from 'state/status/actions'

import CustomDialog from './DateRangePicker'

const mapDispatchToProps = {
  setCustomTimeRange,
  updateWarningStatus,
}

const DateRangePickerContainer = connect(null, mapDispatchToProps)(CustomDialog)

export default DateRangePickerContainer
