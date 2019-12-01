import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchAPositions,
  fetchNextAPositions,
  fetchPrevAPositions,
  jumpPage,
  refresh,
} from 'state/positionsActive/actions'
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
} from 'state/positionsActive/selectors'

import PositionsActive from './PositionsActive'

const mapStateToProps = state => ({
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
  fetchActivepositions: fetchAPositions,
  fetchNext: fetchNextAPositions,
  fetchPrev: fetchPrevAPositions,
  jumpPage,
  refresh,
}

const PositionsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PositionsActive))

export default PositionsContainer
