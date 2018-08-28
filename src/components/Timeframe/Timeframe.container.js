import { connect } from 'react-redux'

import { getQuery, getTimeFrame, getTimeRange } from 'state/query/selectors'
import { setTimeRange } from 'state/query/actions'

import Timeframe from './Timeframe'

function mapStateToProps(state = {}) {
  const { start, end } = getTimeFrame(getQuery(state))
  return {
    start,
    end,
    timeRange: getTimeRange(state),
  }
}

const mapDispatchToProps = dispatch => ({
  setTimeRange: (rangeType, start, end) => dispatch(setTimeRange(rangeType, start, end)),
})

const TimeframeContainer = connect(mapStateToProps, mapDispatchToProps)(Timeframe)

export default TimeframeContainer
