import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchWallets, refresh } from 'state/wallets/actions'
import {
  getDataReceived,
  getEntries,
  getTimestamp,
} from 'state/wallets/selectors'

import ConcentrationRisk from './ConcentrationRisk'

const mapStateToProps = state => ({
  currentTime: getTimestamp(state),
  entries: getEntries(state),
  loading: !getDataReceived(state),
})

const mapDispatchToProps = {
  fetchWallets,
  refresh,
}

const ConcentrationRiskContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConcentrationRisk))

export default ConcentrationRiskContainer
