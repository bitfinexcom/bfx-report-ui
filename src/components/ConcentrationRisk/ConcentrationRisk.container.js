import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/wallets/actions'
import {
  getDataReceived,
  getEntries,
  getTimestamp,
} from 'state/wallets/selectors'
import { getTimezone } from 'state/base/selectors'

import ConcentrationRisk from './ConcentrationRisk'

const mapStateToProps = (state = {}) => ({
  currentTime: getTimestamp(state),
  entries: getEntries(state),
  loading: !getDataReceived(state),
  timezone: getTimezone(state),
})

const mapDispatchToProps = dispatch => ({
  fetchWallets: time => dispatch(actions.fetchWallets(time)),
  refresh: () => dispatch(actions.refresh()),
})

const ConcentrationRiskContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConcentrationRisk))

export default ConcentrationRiskContainer
