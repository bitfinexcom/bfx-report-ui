import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchPositions,
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
  clearTargetPairs,
} from 'state/positions/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getPageLoading,
  getTargetPairs,
} from 'state/positions/selectors'
import { getColumns } from 'state/filters/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import queryConstants from 'state/query/constants'

import Positions from './Positions'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_POSITIONS),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_POSITIONS),
  entries: getFilteredEntries(state, queryConstants.MENU_POSITIONS, getEntries(state)),
  existingPairs: getExistingPairs(state),
  getFullTime: getFullTime(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  targetPairs: getTargetPairs(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchData: fetchPositions,
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
  clearTargetPairs,
}

const PositionsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Positions))

export default PositionsContainer
