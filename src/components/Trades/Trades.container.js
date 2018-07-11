import { connect } from 'react-redux'
import Trades from './Trades'

function mapStateToProps(state = {}) {
  return {
    entries: state.trades.entries,
    loading: !state.trades.dataReceived,
  }
}

const TradesContainer = connect(mapStateToProps)(Trades)

export default TradesContainer
