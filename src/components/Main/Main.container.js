import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { exportCsv, prepareExport, setCustomTimeRange } from 'state/query/actions'
import { showCustomDialog } from 'state/ui/actions'
import { getAuthStatus, getIsShown } from 'state/auth/selectors'
import { getMenuMode, getTimezone } from 'state/base/selectors'
import { getIsCustomDialogOpen } from 'state/ui/selectors'

import Main from './Main'

const mapStateToProps = (state = {}) => ({
  authIsShown: getIsShown(state),
  authStatus: getAuthStatus(state),
  menuMode: getMenuMode(state),
  isCustomOpen: getIsCustomDialogOpen(state),
  timezone: getTimezone(state),
})

const mapDispatchToProps = dispatch => ({
  exportCsv: target => dispatch(exportCsv(target)),
  prepareExport: () => dispatch(prepareExport()),
  setCustomTimeRange: (start, end) => dispatch(setCustomTimeRange(start, end)),
  showCustomDialog: show => dispatch(showCustomDialog(show)),
})

const MainContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))

export default MainContainer
