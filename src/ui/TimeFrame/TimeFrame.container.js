import { connect } from 'react-redux'

import { getInputTimezone, getTimezone } from 'state/base/selectors'
import { getTimeRange } from 'state/timeRange/selectors'
import { setTimeRange } from 'state/timeRange/actions'

import TimeFrame from './TimeFrame'

const mapStateToProps = (state) => ({
  inputTimezone: getInputTimezone(state),
  timeRange: getTimeRange(state),
  timezone: getTimezone(state),
})

const mapDispatchToProps = {
  setTimeRange,
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeFrame)
