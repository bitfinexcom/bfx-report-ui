import { connect } from 'react-redux'

import { getTimezone } from 'state/base/selectors'
import { getTimeFrame } from 'state/timeRange/selectors'
import { toggleTimeFrameDialog } from 'state/ui/actions'

import TimeRange from './TimeRange'

const mapStateToProps = state => ({
  ...getTimeFrame(state),
  timezone: getTimezone(state),
})

const mapDispatchToProps = {
  toggleTimeFrameDialog,
}

const TimeRangeContainer = connect(mapStateToProps, mapDispatchToProps)(TimeRange)

export default TimeRangeContainer
