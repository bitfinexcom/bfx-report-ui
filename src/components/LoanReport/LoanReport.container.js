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
  clearTargetSymbols,
} from 'state/loanReport/actions'
import {
  getParams,
  getEntries,
  getPageLoading,
  getDataReceived,
  getTargetSymbols,
  getCurrentFetchParams,
} from 'state/loanReport/selectors'
import {
  getIsSyncRequired,
  getIsFirstSyncing,
  getShouldRefreshAfterSync,
} from 'state/sync/selectors'
import { setShouldRefreshAfterSync } from 'state/sync/actions'

import LoanReport from './LoanReport'

const mapStateToProps = state => ({
  params: getParams(state),
  entries: getEntries(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
  targetSymbols: getTargetSymbols(state),
  isSyncRequired: getIsSyncRequired(state),
  isFirstSyncing: getIsFirstSyncing(state),
  currentFetchParams: getCurrentFetchParams(state),
  shouldRefreshAfterSync: getShouldRefreshAfterSync(state),
})

const mapDispatchToProps = {
  refresh,
  setParams,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
  fetchData: fetchLoanReport,
  setShouldRefreshAfterSync,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(LoanReport)
