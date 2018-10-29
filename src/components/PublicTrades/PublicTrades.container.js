import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/publicTrades/actions'
import { getTimezone } from 'state/base/selectors'
import { getPairs } from 'state/symbols/selectors'
import {
  getDataReceived,
  getEntries,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetPair,
} from 'state/publicTrades/selectors'

import PublicTrades from './PublicTrades'

const mapStateToProps = (state = {}) => ({
  offset: getOffset(state),
  entries: getEntries(state),
  loading: !getDataReceived(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  pairs: getPairs(state),
  targetPair: getTargetPair(state),
  timezone: getTimezone(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPublictrades: pair => dispatch(actions.fetchPublicTrades(pair)),
  fetchNext: () => dispatch(actions.fetchNextPublicTrades()),
  fetchPrev: () => dispatch(actions.fetchPrevPublicTrades()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  refresh: () => dispatch(actions.refresh()),
  setTargetPair: pair => dispatch(actions.setTargetPair(pair)),
})

const PublicTradesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PublicTrades))

export default PublicTradesContainer
