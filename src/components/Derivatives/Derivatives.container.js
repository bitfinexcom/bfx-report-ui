import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchDerivatives,
  refresh,
  addTargetPair,
  removeTargetPair,
} from 'state/derivatives/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getTargetPairs,
} from 'state/derivatives/selectors'

import Derivatives from './Derivatives'

const mapStateToProps = (state = {}) => ({
  entries: getEntries(state),
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
  removeTargetPair,
}

const DerivativesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Derivatives))

export default DerivativesContainer
