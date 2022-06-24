import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'

import { getTimezone } from 'state/base/selectors'

import GoToRange from './GoToRange'

const mapStateToProps = (state) => ({
  timezone: getTimezone(state),
})

export default compose(
  connect(mapStateToProps),
  withTranslation('translations'),
)(GoToRange)
