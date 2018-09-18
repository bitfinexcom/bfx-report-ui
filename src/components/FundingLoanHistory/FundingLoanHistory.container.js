import { connect } from 'react-redux'

import actions from 'state/fundingLoanHistory/actions'
import { getCoins } from 'state/symbols/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbol,
} from 'state/fundingLoanHistory/selectors'

import FundingLoanHistory from './FundingLoanHistory'

const mapStateToProps = (state = {}) => ({
  coins: getCoins(state),
  offset: getOffset(state),
  entries: getEntries(state),
  existingCoins: getExistingCoins(state),
  loading: !getDataReceived(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  targetSymbol: getTargetSymbol(state),
})

const mapDispatchToProps = dispatch => ({
  fetchFloan: () => dispatch(actions.fetchFLoan()),
  fetchNextFLoan: () => dispatch(actions.fetchNextFLoan()),
  fetchPrevFLoan: () => dispatch(actions.fetchPrevFLoan()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  refresh: () => dispatch(actions.refresh()),
  setTargetSymbol: symbol => dispatch(actions.setTargetSymbol(symbol)),
})

const FundingLoanHistoryContainer = connect(mapStateToProps, mapDispatchToProps)(FundingLoanHistory)

export default FundingLoanHistoryContainer
