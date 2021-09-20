import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchInvoices,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
} from 'state/invoices/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getPageLoading,
  getTargetSymbols,
} from 'state/invoices/selectors'
import { getColumns } from 'state/filters/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import queryConstants from 'state/query/constants'

import Invoices from './Invoices'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_INVOICES),
  entries: getFilteredEntries(state, queryConstants.MENU_INVOICES, getEntries(state)),
  existingCoins: getExistingCoins(state),
  getFullTime: getFullTime(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  targetSymbols: getTargetSymbols(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchData: fetchInvoices,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
}

const InvoicesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Invoices))

export default InvoicesContainer
