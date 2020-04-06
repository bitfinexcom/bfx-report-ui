import { connect } from 'react-redux'

import { getTimezone } from 'state/base/selectors'
import { getTimeFrame } from 'state/timeRange/selectors'

import TimeRange from './TimeRange'

const mapStateToProps = state => ({
  ...getTimeFrame(state),
  timezone: getTimezone(state),
})

const TimeRangeContainer = connect(mapStateToProps)(TimeRange)

export default TimeRangeContainer
