import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchLoanReport,
  refresh,
  addTargetSymbol,
  removeTargetSymbol,
  setTargetSymbols,
  setParams,
} from 'state/loanReport/actions'
import {
  getCurrentFetchParams,
  getDataReceived,
  getEntries,
  getPageLoading,
  getParams,
  getTargetSymbols,
} from 'state/loanReport/selectors'

import LoanReport from './LoanReport'

const mapStateToProps = state => ({
  currentFetchParams: getCurrentFetchParams(state),
  entries: getEntries(state),
  params: getParams(state),
  targetSymbols: getTargetSymbols(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
})

const mapDispatchToProps = {
  fetchData: fetchLoanReport,
  refresh,
  setParams,
  addTargetSymbol,
  removeTargetSymbol,
  setTargetSymbols,
}

const LoanReportContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LoanReport))

export default LoanReportContainer
