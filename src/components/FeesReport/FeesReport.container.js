import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  setParams,
  setReportType,
  fetchFeesReport,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
} from 'state/feesReport/actions'
import {
  getParams,
  getEntries,
  getReportType,
  getPageLoading,
  getTargetPairs,
  getDataReceived,
  getCurrentFetchParams,
  getTargetSymbols,
} from 'state/feesReport/selectors'

import FeesReport from './FeesReport'

const mapStateToProps = state => ({
  params: getParams(state),
  entries: getEntries(state),
  reportType: getReportType(state),
  targetPairs: getTargetPairs(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
  currentFetchParams: getCurrentFetchParams(state),
  targetSymbols: getTargetSymbols(state),
})

const mapDispatchToProps = {
  refresh,
  setParams,
  setReportType,
  addTargetSymbol,
  removeTargetSymbol,
  clearTargetSymbols,
  fetchData: fetchFeesReport,
  setTargetSymbols,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(FeesReport)
