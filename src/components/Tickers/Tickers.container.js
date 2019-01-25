import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/tickers/actions'
import { updateErrorStatus } from 'state/status/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
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
  loading: !getDataReceived(state),
  nextPage: getNextPage(state),
  offset: getOffset(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  targetPairs: getTargetPairs(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = dispatch => ({
  fetchTickers: pair => dispatch(actions.fetchTickers(pair)),
  fetchNext: queryLimit => dispatch(actions.fetchNextTickers(queryLimit)),
  fetchPrev: queryLimit => dispatch(actions.fetchPrevTickers(queryLimit)),
  jumpPage: (page, queryLimit) => dispatch(actions.jumpPage(page, queryLimit)),
  refresh: () => dispatch(actions.refresh()),
  addTargetPair: pair => dispatch(actions.addTargetPair(pair)),
  removeTargetPair: pair => dispatch(actions.removeTargetPair(pair)),
  updateErrorStatus: msg => dispatch(updateErrorStatus(msg)),
})

const TickersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Tickers))

export default TickersContainer
