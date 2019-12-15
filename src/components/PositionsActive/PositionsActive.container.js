import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchAPositions,
  refresh,
} from 'state/positionsActive/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getDataReceived,
  getEntries,
} from 'state/positionsActive/selectors'

import PositionsActive from './PositionsActive'

const mapStateToProps = state => ({
  entries: getEntries(state),
  getFullTime: getFullTime(state),
  loading: !getDataReceived(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchActivepositions: fetchAPositions,
  refresh,
}

const PositionsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PositionsActive))

export default PositionsContainer
