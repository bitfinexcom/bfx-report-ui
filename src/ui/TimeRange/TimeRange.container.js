import { connect } from 'react-redux'

import { getTimezone } from 'state/base/selectors'
import { getTimeFrame } from 'state/query/selectors'

import TimeRange from './TimeRange'

const mapStateToProps = state => ({
  ...getTimeFrame(state.query),
  timezone: getTimezone(state),
})

const TimeRangeContainer = connect(mapStateToProps)(TimeRange)

export default TimeRangeContainer
