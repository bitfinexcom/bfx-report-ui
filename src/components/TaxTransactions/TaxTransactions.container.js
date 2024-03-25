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
import { getColumns } from 'state/filters/selectors'
import { getTimeFrame } from 'state/timeRange/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import queryConstants from 'state/query/constants'

import TaxTransactions from './TaxTransactions'

const mapStateToProps = state => ({
  ...getTimeFrame(state),
  entries: getTransactionsData(state),
  pageLoading: getTransactionsPageLoading(state),
  dataReceived: getTransactionsDataReceived(state),
  columns: getColumns(state, queryConstants.MENU_WEIGHTED_AVERAGES),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_WEIGHTED_AVERAGES),
  getFullTime: getFullTime(state),
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
