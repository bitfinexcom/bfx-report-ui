import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { setTimeRange } from 'state/timeRange/actions'

import TimeFrameShortcut from './TimeFrameShortcut'

const mapDispatchToProps = {
  setTimeRange,
}

export default compose(
  connect(null, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(TimeFrameShortcut)
