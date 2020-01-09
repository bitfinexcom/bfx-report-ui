import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchWallets,
  refresh,
} from 'state/wallets/actions'
import {
  getDataReceived,
  getEntries,
  getPageLoading,
  getTimestamp,
} from 'state/wallets/selectors'

import Wallets from './Wallets'

const mapStateToProps = state => ({
  currentTime: getTimestamp(state),
  entries: getEntries(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
})

const mapDispatchToProps = {
  fetchWallets,
  refresh,
}

const WalletsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallets))

export default WalletsContainer
