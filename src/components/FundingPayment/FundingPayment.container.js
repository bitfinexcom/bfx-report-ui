import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  fetchFPayment,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
} from 'state/fundingPayment/actions'
import { getFilteredEntries } from 'state/pagination/selectors'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getEntries,
  getPageLoading,
  getDataReceived,
  getExistingCoins,
  getTargetSymbols,
} from 'state/fundingPayment/selectors'
import queryConstants from 'state/query/constants'
import { getColumns } from 'state/filters/selectors'
import { getColumnsWidth } from 'state/columns/selectors'

import FundingPayment from './FundingPayment'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_FPAYMENT),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_FPAYMENT),
  dataReceived: getDataReceived(state),
  entries: getFilteredEntries(state, queryConstants.MENU_FPAYMENT, getEntries(state)),
  existingCoins: getExistingCoins(state),
  getFullTime: getFullTime(state),
  pageLoading: getPageLoading(state),
  targetSymbols: getTargetSymbols(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  addTargetSymbol,
  clearTargetSymbols,
  fetchData: fetchFPayment,
  refresh,
  removeTargetSymbol,
  setTargetSymbols,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(FundingPayment)
