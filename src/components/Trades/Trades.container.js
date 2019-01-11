import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/trades/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getTargetQueryLimit } from 'state/query/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetPairs,
  getNextPage,
} from 'state/trades/selectors'

import Trades from './Trades'

const mapStateToProps = (state = {}) => ({
  entries: getEntries(state),
  existingPairs: getExistingPairs(state),
  getFullTime: getFullTime(state),
  getQueryLimit: getTargetQueryLimit(state),
  loading: !getDataReceived(state),
  nextPage: getNextPage(state),
  offset: getOffset(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  targetPairs: getTargetPairs(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = dispatch => ({
  fetchTrades: pair => dispatch(actions.fetchTrades(pair)),
  fetchNext: () => dispatch(actions.fetchNextTrades()),
  fetchPrev: () => dispatch(actions.fetchPrevTrades()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  refresh: () => dispatch(actions.refresh()),
  addTargetPair: pair => dispatch(actions.addTargetPair(pair)),
  removeTargetPair: pair => dispatch(actions.removeTargetPair(pair)),
})

const TradesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Trades))

export default TradesContainer
