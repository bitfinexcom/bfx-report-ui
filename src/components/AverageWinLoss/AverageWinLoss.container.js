import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  setParams,
  fetchWinLoss,
  setReportType,
} from 'state/winLoss/actions'
import {
  getParams,
  getEntries,
  getReportType,
  getPageLoading,
  getDataReceived,
  getCurrentFetchParams,
} from 'state/winLoss/selectors'
import { getIsSyncRequired, getIsFirstSyncing } from 'state/sync/selectors'

import AverageWinLoss from './AverageWinLoss'

const mapStateToProps = state => ({
  params: getParams(state),
  entries: getEntries(state),
  reportType: getReportType(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
  isSyncRequired: getIsSyncRequired(state),
  isFirstSyncing: getIsFirstSyncing(state),
  currentFetchParams: getCurrentFetchParams(state),
})

const mapDispatchToProps = {
  refresh,
  setParams,
  setReportType,
  fetchData: fetchWinLoss,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(AverageWinLoss)
