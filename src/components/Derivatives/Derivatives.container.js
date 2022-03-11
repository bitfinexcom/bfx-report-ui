import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  addTargetPair,
  setTargetPairs,
  fetchDerivatives,
  removeTargetPair,
  clearTargetPairs,
} from 'state/derivatives/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getInactivePairs, getPairs } from 'state/symbols/selectors'
import {
  getEntries,
  getPageLoading,
  getTargetPairs,
  getDataReceived,
  getExistingPairs,
} from 'state/derivatives/selectors'
import { getColumns } from 'state/filters/selectors'
import queryConstants from 'state/query/constants'

import Derivatives from './Derivatives'

const mapStateToProps = state => ({
  pairs: getPairs(state),
  entries: getEntries(state),
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
  pageLoading: getPageLoading(state),
  targetPairs: getTargetPairs(state),
  dataReceived: getDataReceived(state),
  existingPairs: getExistingPairs(state),
  inactivePairs: getInactivePairs(state),
  columns: getColumns(state, queryConstants.MENU_DERIVATIVES),
})

const mapDispatchToProps = {
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
  clearTargetPairs,
  fetchData: fetchDerivatives,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(Derivatives)
