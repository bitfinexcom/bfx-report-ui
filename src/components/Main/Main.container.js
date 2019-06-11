import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { exportCsv, prepareExport, setCustomTimeRange } from 'state/query/actions'
import { showCustomDialog } from 'state/ui/actions'
import { getAuthStatus, getIsShown } from 'state/auth/selectors'
import { getMenuMode, getInputTimezone } from 'state/base/selectors'
import { getIsCustomDialogOpen, getIsFrameworkDialogOpen } from 'state/ui/selectors'

import Main from './Main'

const mapStateToProps = (state = {}) => ({
  authIsShown: getIsShown(state),
  authStatus: getAuthStatus(state),
  menuMode: getMenuMode(state),
  isCustomOpen: getIsCustomDialogOpen(state),
  isFrameworkOpen: getIsFrameworkDialogOpen(state),
  inputTimezone: getInputTimezone(state),
})

const mapDispatchToProps = {
  exportCsv,
  prepareExport,
  setCustomTimeRange,
  showCustomDialog,
}

const MainContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))

export default MainContainer
