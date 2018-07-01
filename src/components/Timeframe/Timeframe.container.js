import { connect } from 'react-redux'
import Timeframe from './Timeframe'
import { getTimeFrame } from 'state/query/selector'

function mapStateToProps(state = {}) {
  return getTimeFrame()
}

const TimeframeContainer = connect(mapStateToProps)(Timeframe)

export default TimeframeContainer
