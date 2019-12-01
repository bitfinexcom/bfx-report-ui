import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchPositions,
  fetchNextPositions,
  fetchPrevPositions,
  jumpPage,
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
} from 'state/positions/actions'
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
} from 'state/positions/selectors'
import { getColumns } from 'state/filters/selectors'
import queryConstants from 'state/query/constants'

import Positions from './Positions'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_POSITIONS),
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

const mapDispatchToProps = {
  fetchPositions,
  fetchNext: fetchNextPositions,
  fetchPrev: fetchPrevPositions,
  jumpPage,
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
}

const PositionsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Positions))

export default PositionsContainer
