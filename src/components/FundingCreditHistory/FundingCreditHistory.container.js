import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchFCredit,
  fetchNextFCredit,
  fetchPrevFCredit,
  jumpPage,
  refresh,
  addTargetSymbol,
  removeTargetSymbol,
} from 'state/fundingCreditHistory/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbols,
  getNextPage,
} from 'state/fundingCreditHistory/selectors'

import FundingCreditHistory from './FundingCreditHistory'

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
})

const mapDispatchToProps = {
  fetchFcredit: fetchFCredit,
  fetchNext: fetchNextFCredit,
  fetchPrev: fetchPrevFCredit,
  jumpPage,
  refresh,
  addTargetSymbol,
  removeTargetSymbol,
}

const FundingCreditHistoryContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FundingCreditHistory))

export default FundingCreditHistoryContainer
