import { connect } from 'react-redux'

import { setDateFormat } from 'state/base/actions'
import { getDateFormat } from 'state/base/selectors'

import DateFormatSelector from './DateFormatSelector'

const mapStateToProps = (state = {}) => ({
  dateFormat: getDateFormat(state),
})

const mapDispatchToProps = {
  setDateFormat,
}

const DateFormatSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(DateFormatSelector)

export default DateFormatSelectorContainer
