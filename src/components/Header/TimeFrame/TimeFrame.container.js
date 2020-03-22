import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getTimezone } from 'state/base/selectors'
import { getQuery, getTimeFrame, getTimeRange } from 'state/query/selectors'
import { setTimeRange } from 'state/query/actions'

import TimeFrame from './TimeFrame'

function mapStateToProps(state) {
  const { start, end } = getTimeFrame(getQuery(state))
  return {
    start,
    end,
    timeRange: getTimeRange(state),
    timezone: getTimezone(state),
  }
}

const mapDispatchToProps = {
  setTimeRange,
}

const TimeFrameContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TimeFrame))

export default TimeFrameContainer
