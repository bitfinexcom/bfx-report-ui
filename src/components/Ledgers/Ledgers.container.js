import { connect } from 'react-redux'

import actions from 'state/ledgers/actions'
import { getCoins } from 'state/symbols/selectors'
import {
  getDataReceived,
  getEntries,
  getExistCoins,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbol,
} from 'state/ledgers/selectors'
import Ledgers from './Ledgers'

const mapStateToProps = (state = {}) => ({
  coins: getCoins(state),
  offset: getOffset(state),
  entries: getEntries(state),
  existCoins: getExistCoins(state),
  loading: !getDataReceived(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  targetSymbol: getTargetSymbol(state),
})

const mapDispatchToProps = dispatch => ({
  fetchLedgers: () => dispatch(actions.fetchLedgers()),
  fetchNextLedgers: () => dispatch(actions.fetchNextLedgers()),
  fetchPrevLedgers: () => dispatch(actions.fetchPrevLedgers()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  refresh: () => dispatch(actions.refresh()),
  setTargetSymbol: symbol => dispatch(actions.setTargetSymbol(symbol)),
})

const LedgersContainer = connect(mapStateToProps, mapDispatchToProps)(Ledgers)

export default LedgersContainer
