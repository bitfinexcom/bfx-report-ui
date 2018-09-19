import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { exportCsv, prepareExport, setCustomTimeRange } from 'state/query/actions'
import { getAuthStatus, getIsShown } from 'state/auth/selectors'
import { getMenuMode } from 'state/base/selectors'

import Main from './Main'

const mapStateToProps = (state = {}) => ({
  authIsShown: getIsShown(state),
  authStatus: getAuthStatus(state),
  menuMode: getMenuMode(state),
})

const mapDispatchToProps = dispatch => ({
  exportCsv: target => dispatch(exportCsv(target)),
  prepareExport: () => dispatch(prepareExport()),
  setCustomTimeRange: (start, end) => dispatch(setCustomTimeRange(start, end)),
})

const MainContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))

export default MainContainer
