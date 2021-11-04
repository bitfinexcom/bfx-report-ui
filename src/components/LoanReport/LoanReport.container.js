import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  setParams,
  addTargetSymbol,
  fetchLoanReport,
  setTargetSymbols,
  removeTargetSymbol,
} from 'state/loanReport/actions'
import {
  getParams,
  getEntries,
  getPageLoading,
  getDataReceived,
  getTargetSymbols,
  getCurrentFetchParams,
} from 'state/loanReport/selectors'

import LoanReport from './LoanReport'

const mapStateToProps = state => ({
  params: getParams(state),
  entries: getEntries(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
  targetSymbols: getTargetSymbols(state),
  currentFetchParams: getCurrentFetchParams(state),
})

const mapDispatchToProps = {
  refresh,
  setParams,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  fetchData: fetchLoanReport,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(LoanReport)
