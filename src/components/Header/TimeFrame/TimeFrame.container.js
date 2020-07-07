import { connect } from 'react-redux'

import { getInputTimezone, getTimezone } from 'state/base/selectors'
import { getTimeFrame } from 'state/timeRange/selectors'

import TimeFrame from './TimeFrame'

function mapStateToProps(state) {
  const { start, end } = getTimeFrame(state)
  return {
    inputTimezone: getInputTimezone(state),
    start,
    end,
  }
}

const TimeFrameContainer = connect(mapStateToProps)(TimeFrame)

export default TimeFrameContainer
