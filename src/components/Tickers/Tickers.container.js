import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchTickers,
  fetchNextTickers,
  fetchPrevTickers,
  jumpPage,
  refresh,
  addTargetPair,
  removeTargetPair,
} from 'state/tickers/actions'
import { updateErrorStatus } from 'state/status/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getTickersHistoryPairs } from 'state/sync/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetPairs,
} from 'state/tickers/selectors'

import Tickers from './Tickers'

const mapStateToProps = (state = {}) => ({
  entries: getEntries(state),
  existingPairs: getExistingPairs(state),
  getFullTime: getFullTime(state),
  hasSyncPref: !!getTickersHistoryPairs(state).length,
  loading: !getDataReceived(state),
  nextPage: getNextPage(state),
  offset: getOffset(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  targetPairs: getTargetPairs(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchTickers,
  fetchNext: fetchNextTickers,
  fetchPrev: fetchPrevTickers,
  jumpPage,
  refresh,
  addTargetPair,
  removeTargetPair,
  updateErrorStatus,
}

const TickersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Tickers))

export default TickersContainer
