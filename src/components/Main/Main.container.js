import { connect } from 'react-redux'

import { exportCsv, setTimeRange } from 'state/query/actions'

import Main from './Main'

function mapStateToProps(state = {}) {
  return {
    authIsShown: state.auth.isShown,
    authStatus: state.auth.authStatus,
  }
}

const mapDispatchToProps = dispatch => ({
  exportCsv: target => dispatch(exportCsv(target)),
  setTimeRange: (rangeType, start, end) => dispatch(setTimeRange(rangeType, start, end)),
})

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main)

export default MainContainer
