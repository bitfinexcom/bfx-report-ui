import { connect } from 'react-redux'

import { getTimeFrame } from 'state/query/selector'
import { setTimeRange } from 'state/query/actions'

import Timeframe from './Timeframe'

function mapStateToProps(state = {}) {
  const { start, end } = getTimeFrame(state.query)
  return {
    start,
    end,
    timeRange: state.query.timeRange,
  }
}

const mapDispatchToProps = dispatch => ({
  setTimeRange: (rangeType, start, end) => dispatch(setTimeRange(rangeType, start, end)),
})

const TimeframeContainer = connect(mapStateToProps, mapDispatchToProps)(Timeframe)

export default TimeframeContainer
