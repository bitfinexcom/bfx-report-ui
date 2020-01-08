import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchLoanReport,
  refresh,
  addTargetPair,
  removeTargetPair,
  setTargetPairs,
  setParams,
} from 'state/loanReport/actions'
import {
  getCurrentFetchParams,
  getDataReceived,
  getEntries,
  getPageLoading,
  getParams,
  getTargetPairs,
} from 'state/loanReport/selectors'

import LoanReport from './LoanReport'

const mapStateToProps = state => ({
  currentFetchParams: getCurrentFetchParams(state),
  entries: getEntries(state),
  params: getParams(state),
  targetPairs: getTargetPairs(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
})

const mapDispatchToProps = {
  fetchLoanReport,
  refresh,
  setParams,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
}

const LoanReportContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LoanReport))

export default LoanReportContainer
