import { connect } from 'react-redux'

import { getInputTimezone } from 'state/base/selectors'

import DateInput from './DateInput'

const mapStateToProps = state => ({
  inputTimezone: getInputTimezone(state),
})

const DateInputContainer = connect(mapStateToProps)(DateInput)

export default DateInputContainer
