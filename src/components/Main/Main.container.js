import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { exportCsv, prepareExport, setTimeRange } from 'state/query/actions'
import { getAuthStatus, getIsShown } from 'state/auth/selectors'

import Main from './Main'

const mapStateToProps = (state = {}) => ({
  authIsShown: getIsShown(state),
  authStatus: getAuthStatus(state),
})

const mapDispatchToProps = dispatch => ({
  exportCsv: target => dispatch(exportCsv(target)),
  prepareExport: () => dispatch(prepareExport()),
  setTimeRange: (rangeType, start, end) => dispatch(setTimeRange(rangeType, start, end)),
})

const MainContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))

export default MainContainer
