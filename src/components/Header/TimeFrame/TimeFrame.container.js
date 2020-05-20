import { connect } from 'react-redux'

import { getTimezone } from 'state/base/selectors'
import { getTimeFrame } from 'state/timeRange/selectors'

import TimeFrame from './TimeFrame'

function mapStateToProps(state) {
  const { start, end } = getTimeFrame(state)
  return {
    start,
    end,
    timezone: getTimezone(state),
  }
}

const TimeFrameContainer = connect(mapStateToProps)(TimeFrame)

export default TimeFrameContainer
