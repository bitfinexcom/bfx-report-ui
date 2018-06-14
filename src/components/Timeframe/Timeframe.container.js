import { connect } from 'react-redux'
import Timeframe from './Timeframe'

function mapStateToProps(state = {}) {
  return state
}

const TimeframeContainer = connect(mapStateToProps)(Timeframe)

export default TimeframeContainer
