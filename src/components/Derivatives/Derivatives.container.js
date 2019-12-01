import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchDerivatives,
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
} from 'state/derivatives/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getPairs } from 'state/symbols/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getTargetPairs,
} from 'state/derivatives/selectors'
import { getColumns } from 'state/filters/selectors'
import queryConstants from 'state/query/constants'

import Derivatives from './Derivatives'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_DERIVATIVES),
  entries: getEntries(state),
  pairs: getPairs(state),
  existingPairs: getExistingPairs(state),
  getFullTime: getFullTime(state),
  loading: !getDataReceived(state),
  targetPairs: getTargetPairs(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchDerivatives,
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
}

const DerivativesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Derivatives))

export default DerivativesContainer
