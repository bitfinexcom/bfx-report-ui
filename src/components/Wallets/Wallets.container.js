import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchWallets,
  refresh,
  setExactBalance,
} from 'state/wallets/actions'
import {
  getDataReceived,
  getEntries,
  getExactBalance,
  getPageLoading,
  getTimestamp,
} from 'state/wallets/selectors'

import Wallets from './Wallets'

const mapStateToProps = state => ({
  currentTime: getTimestamp(state),
  entries: getEntries(state),
  exactBalance: getExactBalance(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
})

const mapDispatchToProps = {
  fetchData: fetchWallets,
  refresh,
  setExactBalance,
}

const WalletsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallets))

export default WalletsContainer
