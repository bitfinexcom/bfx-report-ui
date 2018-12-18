import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/positions/actions'
import { getTimezone } from 'state/base/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetPairs,
} from 'state/positions/selectors'

import Positions from './Positions'

const mapStateToProps = (state = {}) => ({
  offset: getOffset(state),
  entries: getEntries(state),
  existingPairs: getExistingPairs(state),
  loading: !getDataReceived(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  targetPairs: getTargetPairs(state),
  timezone: getTimezone(state),
  nextPage: getNextPage(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPositions: pair => dispatch(actions.fetchPositions(pair)),
  fetchNext: () => dispatch(actions.fetchNextPositions()),
  fetchPrev: () => dispatch(actions.fetchPrevPositions()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  refresh: () => dispatch(actions.refresh()),
  addTargetPair: pair => dispatch(actions.addTargetPair(pair)),
  removeTargetPair: pair => dispatch(actions.removeTargetPair(pair)),
})

const PositionsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Positions))

export default PositionsContainer
