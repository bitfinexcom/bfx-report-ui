import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchFPayment,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
} from 'state/fundingPayment/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getPageLoading,
  getTargetSymbols,
} from 'state/fundingPayment/selectors'
import { getColumns } from 'state/filters/selectors'
import queryConstants from 'state/query/constants'

import FundingPayment from './FundingPayment'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_FPAYMENT),
  entries: getFilteredEntries(state, queryConstants.MENU_FPAYMENT, getEntries(state)),
  existingCoins: getExistingCoins(state),
  getFullTime: getFullTime(state),
  loading: !getDataReceived(state),
  pageLoading: getPageLoading(state),
  targetSymbols: getTargetSymbols(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchFpayment: fetchFPayment,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
}

const FundingPaymentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FundingPayment))

export default FundingPaymentContainer
