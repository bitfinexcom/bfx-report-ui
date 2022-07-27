import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchFLoan,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
} from 'state/fundingLoanHistory/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getPageLoading,
  getTargetSymbols,
} from 'state/fundingLoanHistory/selectors'
import { getColumns } from 'state/filters/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import queryConstants from 'state/query/constants'

import FundingLoanHistory from './FundingLoanHistory'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_FLOAN),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_FLOAN),
  entries: getFilteredEntries(state, queryConstants.MENU_FLOAN, getEntries(state)),
  existingCoins: getExistingCoins(state),
  getFullTime: getFullTime(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  targetSymbols: getTargetSymbols(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchData: fetchFLoan,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
}

const FundingLoanHistoryContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FundingLoanHistory))

export default FundingLoanHistoryContainer
