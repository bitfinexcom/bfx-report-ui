import { connect } from 'react-redux'

import { getTimeFrame } from 'state/query/selectors'

import TimeRange from './TimeRange'

const mapStateToProps = (state = {}) => getTimeFrame(state.query)

const TimeRangeContainer = connect(mapStateToProps)(TimeRange)

export default TimeRangeContainer
