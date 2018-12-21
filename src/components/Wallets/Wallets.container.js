import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/wallets/actions'
import { getDataReceived, getEntries } from 'state/wallets/selectors'
import _debounce from 'lodash/debounce'

import Wallets from './Wallets'

const mapStateToProps = (state = {}) => ({
  entries: getEntries(state),
  loading: !getDataReceived(state),
})

const mapDispatchToProps = dispatch => ({
  fetchWallets: end => dispatch(actions.fetchWallets(end)),
  debouncedFetchWallets: _debounce(end => dispatch(actions.fetchWallets(end)), 5000),
  refresh: () => dispatch(actions.refresh()),
})

const WalletsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallets))

export default WalletsContainer
