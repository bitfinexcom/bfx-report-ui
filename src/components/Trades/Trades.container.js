import { connect } from 'react-redux'
import actions from 'state/trades/actions'
import Trades from './Trades'

function mapStateToProps(state = {}) {
  return {
    offset: state.trades.offset,
    entries: state.trades.entries,
    loading: !state.trades.dataReceived,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchTrades: () => dispatch(actions.fetchTrades()),
  fetchNextTrades: () => dispatch(actions.fetchNextTrades()),
  fetchPrevTrades: () => dispatch(actions.fetchPrevTrades()),
})

const TradesContainer = connect(mapStateToProps, mapDispatchToProps)(Trades)

export default TradesContainer
