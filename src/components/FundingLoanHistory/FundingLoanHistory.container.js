import { connect } from 'react-redux'

import actions from 'state/fundingLoanHistory/actions'
import {
  getDataReceived,
  getEntries,
  getOffset,
  getPageLoading,
  getPageOffset,
} from 'state/fundingLoanHistory/selectors'

import FundingLoanHistory from './FundingLoanHistory'

const mapStateToProps = (state = {}) => ({
  offset: getOffset(state),
  entries: getEntries(state),
  loading: !getDataReceived(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
})

const mapDispatchToProps = dispatch => ({
  fetchFloan: () => dispatch(actions.fetchFLoan()),
  fetchNextFLoan: () => dispatch(actions.fetchNextFLoan()),
  fetchPrevFLoan: () => dispatch(actions.fetchPrevFLoan()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
})

const FundingLoanHistoryContainer = connect(mapStateToProps, mapDispatchToProps)(FundingLoanHistory)

export default FundingLoanHistoryContainer
