import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { getTimeFrame, getTimeRange } from 'state/timeRange/selectors'
import { getIsGoToRangeDialogOpen } from 'state/ui/selectors'
import { setTimeRange } from 'state/timeRange/actions'
import { toggleGoToRangeDialog } from 'state/ui/actions'

import GoToRangeDialog from './GoToRangeDialog'

const mapStateToProps = state => ({
  ...getTimeFrame(state),
  timeRange: getTimeRange(state),
  isOpen: getIsGoToRangeDialogOpen(state),
})

const mapDispatchToProps = {
  setTimeRange,
  toggleDialog: toggleGoToRangeDialog,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(GoToRangeDialog)
