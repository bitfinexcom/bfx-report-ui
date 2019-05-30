import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchFPayment,
  fetchNextFPayment,
  fetchPrevFPayment,
  jumpPage,
  refresh,
  addTargetSymbol,
  removeTargetSymbol,
} from 'state/fundingPayment/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getTargetQueryLimit } from 'state/query/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbols,
  getNextPage,
} from 'state/fundingPayment/selectors'

import FundingPayment from './FundingPayment'

const mapStateToProps = (state = {}) => ({
  entries: getEntries(state),
  existingCoins: getExistingCoins(state),
  getFullTime: getFullTime(state),
  loading: !getDataReceived(state),
  nextPage: getNextPage(state),
  offset: getOffset(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  targetSymbols: getTargetSymbols(state),
  timeOffset: getTimeOffset(state),
  getQueryLimit: getTargetQueryLimit(state),
})

const mapDispatchToProps = {
  fetchFpayment: fetchFPayment,
  fetchNext: fetchNextFPayment,
  fetchPrev: fetchPrevFPayment,
  jumpPage,
  refresh,
  addTargetSymbol,
  removeTargetSymbol,
}

const FundingPaymentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FundingPayment))

export default FundingPaymentContainer
