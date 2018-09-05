import { connect } from 'react-redux'

import actions from 'state/fundingCreditHistory/actions'
import {
  getDataReceived,
  getEntries,
  getOffset,
  getPageLoading,
  getPageOffset,
} from 'state/fundingCreditHistory/selectors'

import FundingCreditHistory from './FundingCreditHistory'

const mapStateToProps = (state = {}) => ({
  offset: getOffset(state),
  entries: getEntries(state),
  loading: !getDataReceived(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
})

const mapDispatchToProps = dispatch => ({
  fetchFcredit: () => dispatch(actions.fetchFCredit()),
  fetchNextFCredit: () => dispatch(actions.fetchNextFCredit()),
  fetchPrevFCredit: () => dispatch(actions.fetchPrevFCredit()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
})

const FundingCreditHistoryContainer = connect(mapStateToProps, mapDispatchToProps)(FundingCreditHistory)

export default FundingCreditHistoryContainer
