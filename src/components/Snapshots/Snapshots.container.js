import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchSnapshots,
  refresh,
} from 'state/snapshots/actions'
import {
  getDataReceived,
  getPageLoading,
  getPositionsTotalPl,
  getPositionsEntries,
  getPositionsTickersEntries,
  getWalletsTotalBalance,
  getWalletsTickersEntries,
  getWalletsEntries,
  getTimestamp,
} from 'state/snapshots/selectors'

import Snapshots from './Snapshots'

const mapStateToProps = state => ({
  currentTime: getTimestamp(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  positionsTotalPlUsd: getPositionsTotalPl(state),
  positionsEntries: getPositionsEntries(state),
  positionsTickersEntries: getPositionsTickersEntries(state),
  walletsTotalBalanceUsd: getWalletsTotalBalance(state),
  walletsTickersEntries: getWalletsTickersEntries(state),
  walletsEntries: getWalletsEntries(state),
})

const mapDispatchToProps = {
  fetchData: fetchSnapshots,
  refresh,
}

const SnapshotsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Snapshots))

export default SnapshotsContainer
