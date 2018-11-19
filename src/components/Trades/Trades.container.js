import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/trades/actions'
import { getTimezone } from 'state/base/selectors'
import { getPairs } from 'state/symbols/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetPair,
  getNextPage,
} from 'state/trades/selectors'

import Trades from './Trades'

const mapStateToProps = (state = {}) => ({
  offset: getOffset(state),
  entries: getEntries(state),
  existingPairs: getExistingPairs(state),
  loading: !getDataReceived(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  pairs: getPairs(state),
  targetPair: getTargetPair(state),
  timezone: getTimezone(state),
  nextPage: getNextPage(state),
})

const mapDispatchToProps = dispatch => ({
  fetchTrades: pair => dispatch(actions.fetchTrades(pair)),
  fetchNextTrades: () => dispatch(actions.fetchNextTrades()),
  fetchPrevTrades: () => dispatch(actions.fetchPrevTrades()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  refresh: () => dispatch(actions.refresh()),
  setTargetPair: pair => dispatch(actions.setTargetPair(pair)),
})

const TradesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Trades))

export default TradesContainer
