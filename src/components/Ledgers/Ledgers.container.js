import { connect } from 'react-redux'

import actions from 'state/ledgers/actions'
import { getCoins } from 'state/symbols/selectors'
import {
  getCurencies,
  getCurrentSymbol,
  getDataReceived,
  getEntries,
  getOffset,
  getPageLoading,
  getPageOffset,
} from 'state/ledgers/selectors'
import Ledgers from './Ledgers'

const mapStateToProps = (state = {}) => ({
  coins: getCoins(state),
  offset: getOffset(state),
  currencies: getCurencies(state),
  currentSymbol: getCurrentSymbol(state),
  entries: getEntries(state),
  loading: !getDataReceived(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
})

const mapDispatchToProps = dispatch => ({
  fetchLedgers: () => dispatch(actions.fetchLedgers()),
  fetchNextLedgers: () => dispatch(actions.fetchNextLedgers()),
  fetchPrevLedgers: () => dispatch(actions.fetchPrevLedgers()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  setCurrentSymbol: symbol => dispatch(actions.setCurrentSymbol(symbol)),
})

const LedgersContainer = connect(mapStateToProps, mapDispatchToProps)(Ledgers)

export default LedgersContainer
