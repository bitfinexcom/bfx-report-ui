import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  fetchTaxReportTransactions,
  refreshTaxReportTransactions,
} from 'state/taxReport/actions'
import { getFullTime } from 'state/base/selectors'
import {
  getTransactionsData,
  getTransactionsPageLoading,
  getTransactionsDataReceived,
} from 'state/taxReport/selectors'
import { getTimeFrame } from 'state/timeRange/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import { getIsSyncRequired } from 'state/sync/selectors'
import queryConstants from 'state/query/constants'

import TaxTransactions from './TaxReport'

const mapStateToProps = state => ({
  ...getTimeFrame(state),
  getFullTime: getFullTime(state),
  entries: getTransactionsData(state),
  pageLoading: getTransactionsPageLoading(state),
  dataReceived: getTransactionsDataReceived(state),
  isSyncRequired: getIsSyncRequired(state),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_TAX_REPORT),
})

const mapDispatchToProps = {
  refresh: refreshTaxReportTransactions,
  fetchData: fetchTaxReportTransactions,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(TaxTransactions)
