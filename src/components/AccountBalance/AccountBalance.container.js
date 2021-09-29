import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  refresh,
  setParams,
  fetchBalance,
} from 'state/accountBalance/actions'
import {
  getEntries,
  getTimeframe,
  getPageLoading,
  getDataReceived,
  getCurrentFetchParams,
} from 'state/accountBalance/selectors'

import AccountBalance from './AccountBalance'

const mapStateToProps = state => ({
  entries: getEntries(state),
  timeframe: getTimeframe(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
  currentFetchParams: getCurrentFetchParams(state),
})

const mapDispatchToProps = {
  refresh,
  setParams,
  fetchData: fetchBalance,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(AccountBalance)
