import { connect } from 'react-redux'
import actions from 'state/trades/actions'
import Trades from './Trades'

function mapStateToProps(state = {}) {
  return {
    entries: state.trades.entries,
    loading: !state.trades.dataReceived,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchTrades: () => dispatch(actions.fetchTrades()),
})

const TradesContainer = connect(mapStateToProps, mapDispatchToProps)(Trades)

export default TradesContainer
