import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchTrades,
  fetchNextTrades,
  fetchPrevTrades,
  jumpPage,
  refresh,
  addTargetPair,
  removeTargetPair, setTargetPairs,
} from 'state/trades/actions'
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

const mapDispatchToProps = {
  fetchTrades,
  fetchNext: fetchNextTrades,
  fetchPrev: fetchPrevTrades,
  jumpPage,
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
}

const TradesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Trades))

export default TradesContainer
