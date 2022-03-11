import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  setParams,
  addTargetPair,
  setTargetPairs,
  clearTargetPairs,
  removeTargetPair,
  fetchFeesReport,
} from 'state/feesReport/actions'
import {
  getParams,
  getEntries,
  getTargetPairs,
  getPageLoading,
  getDataReceived,
  getCurrentFetchParams,
} from 'state/feesReport/selectors'

import FeesReport from './FeesReport'

const mapStateToProps = state => ({
  params: getParams(state),
  entries: getEntries(state),
  pageLoading: getPageLoading(state),
  targetPairs: getTargetPairs(state),
  dataReceived: getDataReceived(state),
  currentFetchParams: getCurrentFetchParams(state),
})

const mapDispatchToProps = {
  fetchData: fetchFeesReport,
  refresh,
  setParams,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
  clearTargetPairs,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(FeesReport)
