import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { getTimeFrame, getTimeRange } from 'state/timeRange/selectors'
import { getIsTimeFrameDialogOpen } from 'state/ui/selectors'
import { setTimeRange } from 'state/timeRange/actions'
import { toggleTimeFrameDialog } from 'state/ui/actions'

import GoToRangeDialog from './GoToRangeDialog'

const mapStateToProps = state => ({
  ...getTimeFrame(state),
  timeRange: getTimeRange(state),
  isOpen: getIsTimeFrameDialogOpen(state),
})

const mapDispatchToProps = {
  setTimeRange,
  toggleDialog: toggleTimeFrameDialog,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(GoToRangeDialog)
