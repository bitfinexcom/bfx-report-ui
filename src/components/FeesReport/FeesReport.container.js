import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  setParams,
  addTargetPair,
  setReportType,
  setTargetPairs,
  fetchFeesReport,
  removeTargetPair,
  clearTargetPairs,
} from 'state/feesReport/actions'
import {
  getParams,
  getEntries,
  getReportType,
  getPageLoading,
  getTargetPairs,
  getDataReceived,
  getCurrentFetchParams,
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
})

const mapDispatchToProps = {
  refresh,
  setParams,
  addTargetPair,
  setTargetPairs,
  setReportType,
  removeTargetPair,
  clearTargetPairs,
  fetchData: fetchFeesReport,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(FeesReport)
