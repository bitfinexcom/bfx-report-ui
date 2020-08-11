import { connect } from 'react-redux'

import { toggleTimeRangePreserve } from 'state/timeRange/actions'
import { getIsTimeRangePreserved } from 'state/timeRange/selectors'

import TimeRangePreservePref from './TimeRangePreservePref'

const mapStateToProps = state => ({
  isTimeRangePreserved: getIsTimeRangePreserved(state),
})

const mapDispatchToProps = {
  toggleTimeRangePreserve,
}

const TimeFramePreservePrefContainer = connect(mapStateToProps, mapDispatchToProps)(TimeRangePreservePref)

export default TimeFramePreservePrefContainer
