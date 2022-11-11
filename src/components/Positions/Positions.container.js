import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  addTargetPair,
  fetchPositions,
  setTargetPairs,
  removeTargetPair,
  clearTargetPairs,
} from 'state/positions/actions'
import { getFilteredEntries } from 'state/pagination/selectors'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getEntries,
  getPageLoading,
  getTargetPairs,
  getDataReceived,
  getExistingPairs,
} from 'state/positions/selectors'
import queryConstants from 'state/query/constants'
import { getColumns } from 'state/filters/selectors'
import { getColumnsWidth } from 'state/columns/selectors'

import Positions from './Positions'

const mapStateToProps = state => ({
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
  pageLoading: getPageLoading(state),
  targetPairs: getTargetPairs(state),
  dataReceived: getDataReceived(state),
  existingPairs: getExistingPairs(state),
  columns: getColumns(state, queryConstants.MENU_POSITIONS),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_POSITIONS),
  entries: getFilteredEntries(state, queryConstants.MENU_POSITIONS, getEntries(state)),
})

const mapDispatchToProps = {
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
  clearTargetPairs,
  fetchData: fetchPositions,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(Positions)
