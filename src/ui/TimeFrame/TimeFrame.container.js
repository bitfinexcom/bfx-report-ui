import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'

import { getTimezone } from 'state/base/selectors'

import TimeFrame from './TimeFrame'

const mapStateToProps = (state) => ({
  timezone: getTimezone(state),
})

export default compose(
  connect(mapStateToProps),
  withTranslation('translations'),
)(TimeFrame)
