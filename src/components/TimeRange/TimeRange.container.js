import { connect } from 'react-redux'

import { getTimeFrame } from 'state/query/selector'

import TimeRange from './TimeRange'

const mapStateToProps = (state = {}) => getTimeFrame(state.query)

const TimeRangeContainer = connect(mapStateToProps)(TimeRange)

export default TimeRangeContainer
