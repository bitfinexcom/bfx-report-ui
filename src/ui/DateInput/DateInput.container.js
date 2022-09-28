import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { getTimezone } from 'state/base/selectors'

import DateInput from './DateInput'

const mapStateToProps = (state) => ({
  timezone: getTimezone(state),
})

export default compose(
  withTranslation('translations'),
  connect(mapStateToProps),
)(DateInput)
