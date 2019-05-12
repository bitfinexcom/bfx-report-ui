import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/winLoss/actions'
import {
  getDataReceived,
  getEntries,
  getParams,
} from 'state/winLoss/selectors'
import { getTimezone } from 'state/base/selectors'

import AverageWinLoss from './AverageWinLoss'

const mapStateToProps = (state = {}) => ({
  entries: getEntries(state),
  params: getParams(state),
  loading: !getDataReceived(state),
  timezone: getTimezone(state),
})

const mapDispatchToProps = dispatch => ({
  fetchWinLoss: params => dispatch(actions.fetchWinLoss(params)),
  refresh: () => dispatch(actions.refresh()),
})

const AverageWinLossContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AverageWinLoss))

export default AverageWinLossContainer
