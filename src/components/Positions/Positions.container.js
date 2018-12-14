import { connect } from 'react-redux'

import actions from 'state/positions/actions'
import { getTimezone } from 'state/base/selectors'
import {
  getDataReceived,
  getEntries,
  getOffset,
  getPageLoading,
  getPageOffset,
  getNextPage,
} from 'state/positions/selectors'

import Positions from './Positions'

const mapStateToProps = (state = {}) => ({
  offset: getOffset(state),
  entries: getEntries(state),
  loading: !getDataReceived(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  timezone: getTimezone(state),
  nextPage: getNextPage(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPositions: () => dispatch(actions.fetchPositions()),
  fetchNext: () => dispatch(actions.fetchNextPositions()),
  fetchPrev: () => dispatch(actions.fetchPrevPositions()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  refresh: () => dispatch(actions.refresh()),
})

const PositionsContainer = connect(mapStateToProps, mapDispatchToProps)(Positions)

export default PositionsContainer
