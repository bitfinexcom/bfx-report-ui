import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/fundingLoanHistory/actions'
import { getTimezone } from 'state/base/selectors'
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
  offset: getOffset(state),
  entries: getEntries(state),
  existingCoins: getExistingCoins(state),
  loading: !getDataReceived(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  targetSymbols: getTargetSymbols(state),
  timezone: getTimezone(state),
  nextPage: getNextPage(state),
})

const mapDispatchToProps = dispatch => ({
  fetchFloan: symbol => dispatch(actions.fetchFLoan(symbol)),
  fetchNext: () => dispatch(actions.fetchNextFLoan()),
  fetchPrev: () => dispatch(actions.fetchPrevFLoan()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  refresh: () => dispatch(actions.refresh()),
  addTargetSymbol: symbol => dispatch(actions.addTargetSymbol(symbol)),
  removeTargetSymbol: symbol => dispatch(actions.removeTargetSymbol(symbol)),
})

const FundingLoanHistoryContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FundingLoanHistory))

export default FundingLoanHistoryContainer
