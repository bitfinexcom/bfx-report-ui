import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchFeesReport,
  refresh,
  addTargetPair,
  removeTargetPair,
  setTargetPairs,
  setParams,
} from 'state/feesReport/actions'
import {
  getCurrentFetchParams,
  getDataReceived,
  getEntries,
  getPageLoading,
  getParams,
  getTargetPairs,
} from 'state/feesReport/selectors'

import FeesReport from './FeesReport'

const mapStateToProps = state => ({
  currentFetchParams: getCurrentFetchParams(state),
  entries: getEntries(state),
  params: getParams(state),
  targetPairs: getTargetPairs(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
})

const mapDispatchToProps = {
  fetchFeesReport,
  refresh,
  setParams,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
}

const FeesReportContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FeesReport))

export default FeesReportContainer
