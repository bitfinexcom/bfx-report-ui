import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchFLoan,
  fetchNextFLoan,
  fetchPrevFLoan,
  jumpPage,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
} from 'state/fundingLoanHistory/actions'
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
} from 'state/fundingLoanHistory/selectors'

import FundingLoanHistory from './FundingLoanHistory'

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
  fetchFloan: fetchFLoan,
  fetchNext: fetchNextFLoan,
  fetchPrev: fetchPrevFLoan,
  jumpPage,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
}

const FundingLoanHistoryContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FundingLoanHistory))

export default FundingLoanHistoryContainer
