import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchBalance,
  refresh,
} from 'state/accountBalance/actions'
import {
  getDataReceived,
  getEntries,
  getPageLoading,
  getParams,
} from 'state/accountBalance/selectors'

import AccountBalance from './AccountBalance'

const mapStateToProps = state => ({
  entries: getEntries(state),
  params: getParams(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
})

const mapDispatchToProps = {
  fetchBalance,
  refresh,
}

const AccountBalanceContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountBalance))

export default AccountBalanceContainer
