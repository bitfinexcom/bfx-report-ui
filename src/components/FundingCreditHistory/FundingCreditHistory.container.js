import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/fundingCreditHistory/actions'
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
} from 'state/fundingCreditHistory/selectors'

import FundingCreditHistory from './FundingCreditHistory'

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
  fetchFcredit: symbol => dispatch(actions.fetchFCredit(symbol)),
  fetchNext: () => dispatch(actions.fetchNextFCredit()),
  fetchPrev: () => dispatch(actions.fetchPrevFCredit()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  refresh: () => dispatch(actions.refresh()),
  addTargetSymbol: symbol => dispatch(actions.addTargetSymbol(symbol)),
  removeTargetSymbol: symbol => dispatch(actions.removeTargetSymbol(symbol)),
})

const FundingCreditHistoryContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FundingCreditHistory))

export default FundingCreditHistoryContainer
