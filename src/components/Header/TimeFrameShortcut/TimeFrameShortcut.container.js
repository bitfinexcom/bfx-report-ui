import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setTimeRange } from 'state/timeRange/actions'

import TimeFrameShortcut from './TimeFrameShortcut'

const mapDispatchToProps = {
  setTimeRange,
}

const TimeFrameShortcutContainer = withRouter(connect(null, mapDispatchToProps)(TimeFrameShortcut))

export default TimeFrameShortcutContainer
