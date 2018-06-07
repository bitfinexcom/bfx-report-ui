import { connect } from 'react-redux'
import Trades from './Trades'
// import actions from '../../state/auth/actions'

function mapStateToProps(state = {}) {
  return {
    entries: state.trades.entries,
  };
}

// const mapDispatchToProps = dispatch => ({
// setKey: (key, secret) => {
// dispatch(actions.setApiKey(key, secret))
// },
// })

const TradesContainer = connect(mapStateToProps)(Trades)

export default TradesContainer
