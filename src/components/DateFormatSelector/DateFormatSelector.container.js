import { connect } from 'react-redux'

import actions from 'state/base/actions'
import { getDateFormat } from 'state/base/selectors'

import DateFormatSelector from './DateFormatSelector'

const mapStateToProps = (state = {}) => ({
  dateFormat: getDateFormat(state),
})

const mapDispatchToProps = dispatch => ({
  setDateFormat: format => dispatch(actions.setDateFormat(format)),
})

const DateFormatSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(DateFormatSelector)

export default DateFormatSelectorContainer
