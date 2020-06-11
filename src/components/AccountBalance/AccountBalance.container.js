import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchBalance,
  refresh,
  setParams,
} from 'state/accountBalance/actions'
import {
  getCurrentFetchParams,
  getDataReceived,
  getEntries,
  getPageLoading,
  getTimeframe,
} from 'state/accountBalance/selectors'

import AccountBalance from './AccountBalance'

const mapStateToProps = state => ({
  currentFetchParams: getCurrentFetchParams(state),
  entries: getEntries(state),
  timeframe: getTimeframe(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
})

const mapDispatchToProps = {
  fetchData: fetchBalance,
  refresh,
  setParams,
}

const AccountBalanceContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountBalance))

export default AccountBalanceContainer
