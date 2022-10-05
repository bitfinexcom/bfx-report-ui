import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  fetchFLoan,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
} from 'state/fundingLoanHistory/actions'
import { getFilteredEntries } from 'state/pagination/selectors'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getEntries,
  getPageLoading,
  getDataReceived,
  getTargetSymbols,
  getExistingCoins,
} from 'state/fundingLoanHistory/selectors'
import queryConstants from 'state/query/constants'
import { getColumns } from 'state/filters/selectors'
import { getColumnsWidth } from 'state/columns/selectors'

import FundingLoanHistory from './FundingLoanHistory'

const mapStateToProps = state => ({
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
  existingCoins: getExistingCoins(state),
  targetSymbols: getTargetSymbols(state),
  columns: getColumns(state, queryConstants.MENU_FLOAN),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_FLOAN),
  entries: getFilteredEntries(state, queryConstants.MENU_FLOAN, getEntries(state)),
})

const mapDispatchToProps = {
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
  fetchData: fetchFLoan,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(FundingLoanHistory)
