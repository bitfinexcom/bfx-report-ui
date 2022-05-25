import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  refresh,
  fetchWallets,
  setExactBalance,
} from 'state/wallets/actions'
import { fetchSnapshots } from 'state/snapshots/actions'
import { getWalletsEntries } from 'state/snapshots/selectors'
import {
  getEntries,
  getTimestamp,
  getPageLoading,
  getExactBalance,
  getDataReceived,
} from 'state/wallets/selectors'

import Wallets from './Wallets'

const mapStateToProps = state => ({
  entries: getEntries(state),
  currentTime: getTimestamp(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
  exactBalance: getExactBalance(state),
  walletsSnapshotEntries: getWalletsEntries(state),
})

const mapDispatchToProps = {
  refresh,
  fetchSnapshots,
  setExactBalance,
  fetchData: fetchWallets,
}

const WalletsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallets))

export default WalletsContainer
