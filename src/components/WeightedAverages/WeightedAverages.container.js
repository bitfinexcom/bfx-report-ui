import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
  clearTargetPairs,
  fetchWeightedAwerages,
} from 'state/weightedAverages/actions'
import { getInactivePairs, getPairs } from 'state/symbols/selectors'
import {
  getEntries,
  getPageLoading,
  getTargetPairs,
  getDataReceived,
  getExistingPairs,
} from 'state/weightedAverages/selectors'
import { getColumns } from 'state/filters/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import queryConstants from 'state/query/constants'

import WeightedAverages from './WeightedAverages'

const mapStateToProps = state => ({
  pairs: getPairs(state),
  entries: getEntries(state),
  pageLoading: getPageLoading(state),
  targetPairs: getTargetPairs(state),
  dataReceived: getDataReceived(state),
  existingPairs: getExistingPairs(state),
  inactivePairs: getInactivePairs(state),
  columns: getColumns(state, queryConstants.MENU_WEIGHTED_AVERAGES),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_WEIGHTED_AVERAGES),
})

const mapDispatchToProps = {
  refresh,
  addTargetPair,
  setTargetPairs,
  clearTargetPairs,
  removeTargetPair,
  fetchData: fetchWeightedAwerages,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(WeightedAverages)
