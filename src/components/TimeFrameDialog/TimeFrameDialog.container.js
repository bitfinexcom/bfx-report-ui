import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { getTimezone } from 'state/base/selectors'
import { getTimeFrame } from 'state/timeRange/selectors'
import { getIsTimeFrameDialogOpen } from 'state/ui/selectors'
import { toggleTimeFrameDialog } from 'state/ui/actions'

import TimeFrameDialog from './TimeFrameDialog'

const mapStateToProps = state => ({
  ...getTimeFrame(state),
  timezone: getTimezone(state),
  isOpen: getIsTimeFrameDialogOpen(state),
})

const mapDispatchToProps = {
  toggleDialog: toggleTimeFrameDialog,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(TimeFrameDialog)
