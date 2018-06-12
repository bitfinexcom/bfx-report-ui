import { connect } from 'react-redux'
import Timeframe from './Timeframe'
// import actions from '../../state/auth/actions'

function mapStateToProps(state = {}) {
  return state;
}

const TimeframeContainer = connect(mapStateToProps)(Timeframe)

export default TimeframeContainer
