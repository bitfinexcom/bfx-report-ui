import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchWallets,
  refresh,
} from 'state/wallets/actions'
import {
  getDataReceived,
  getEntries,
  getTimestamp,
} from 'state/wallets/selectors'
import { getTimezone } from 'state/base/selectors'

import Wallets from './Wallets'

const mapStateToProps = (state = {}) => ({
  currentTime: getTimestamp(state),
  entries: getEntries(state),
  loading: !getDataReceived(state),
  timezone: getTimezone(state),
})

const mapDispatchToProps = {
  fetchWallets,
  refresh,
}

const WalletsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallets))

export default WalletsContainer
