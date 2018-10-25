import { connect } from 'react-redux'

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
  fetchPublicTrades: () => dispatch(actions.fetchPublicTrades()),
  fetchNext: () => dispatch(actions.fetchNextPublicTrades()),
  fetchPrev: () => dispatch(actions.fetchPrevPublicTrades()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  refresh: () => dispatch(actions.refresh()),
  setTargetPair: pair => dispatch(actions.setTargetPair(pair)),
})

const PublicTradesContainer = connect(mapStateToProps, mapDispatchToProps)(PublicTrades)

export default PublicTradesContainer
