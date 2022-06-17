import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { getGoToRange } from 'state/goToRange/selectors'
import { getIsGoToRangeDialogOpen } from 'state/ui/selectors'
import { setGoToRange, setGoToRangePreserve } from 'state/goToRange/actions'
import { toggleGoToRangeDialog } from 'state/ui/actions'

import GoToRangeDialog from './GoToRangeDialog'

const mapStateToProps = state => ({
  timeRange: getGoToRange(state),
  isOpen: getIsGoToRangeDialogOpen(state),
})

const mapDispatchToProps = {
  setGoToRangePreserve,
  setTimeRange: setGoToRange,
  toggleDialog: toggleGoToRangeDialog,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(GoToRangeDialog)
