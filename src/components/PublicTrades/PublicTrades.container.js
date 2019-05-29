import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchPublicTrades,
  fetchNextPublicTrades,
  fetchPrevPublicTrades,
  jumpPage,
  refresh,
  setTargetPair,
} from 'state/publicTrades/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getPairs } from 'state/symbols/selectors'
import { hasSyncPref } from 'state/sync/selectors'
import {
  getDataReceived,
  getEntries,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetPair,
  getNextPage,
} from 'state/publicTrades/selectors'

import PublicTrades from './PublicTrades'

const mapStateToProps = (state = {}) => ({
  entries: getEntries(state),
  getFullTime: getFullTime(state),
  hasSyncPref: hasSyncPref(state),
  loading: !getDataReceived(state),
  nextPage: getNextPage(state),
  offset: getOffset(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  pairs: getPairs(state),
  targetPair: getTargetPair(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchPublictrades: fetchPublicTrades,
  fetchNext: fetchNextPublicTrades,
  fetchPrev: fetchPrevPublicTrades,
  jumpPage,
  refresh,
  setTargetPair,
}

const PublicTradesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PublicTrades))

export default PublicTradesContainer
