import { connect } from 'react-redux'

import { getFullTime, getTimeOffset } from 'state/base/selectors'

import PositionsSnapshot from './PositionsSnapshot'

const mapStateToProps = state => ({
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
})

const PositionsSnapshotContainer = connect(mapStateToProps, null)(PositionsSnapshot)

export default PositionsSnapshotContainer
