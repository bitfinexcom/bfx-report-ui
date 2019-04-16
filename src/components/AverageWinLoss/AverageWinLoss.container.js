import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/risk/actions'
import {
  getDataReceived,
  getEntries,
  getParams,
} from 'state/risk/selectors'

import AverageWinLoss from './AverageWinLoss'

const mapStateToProps = (state = {}) => ({
  entries: getEntries(state),
  params: getParams(state),
  loading: !getDataReceived(state),
})

const mapDispatchToProps = dispatch => ({
  fetchRisk: params => dispatch(actions.fetchRisk(params)),
  setParams: params => dispatch(actions.setParams(params)),
  refresh: () => dispatch(actions.refresh()),
})

const AverageWinLossContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AverageWinLoss))

export default AverageWinLossContainer
