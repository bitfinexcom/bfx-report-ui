import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/fundingCreditHistory/actions'
import { getTimezone } from 'state/base/selectors'
import { getCoins, getCurrencies } from 'state/symbols/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbol,
  getNextPage,
} from 'state/fundingCreditHistory/selectors'

import FundingCreditHistory from './FundingCreditHistory'

const mapStateToProps = (state = {}) => ({
  coins: getCoins(state),
  currencies: getCurrencies(state),
  offset: getOffset(state),
  entries: getEntries(state),
  existingCoins: getExistingCoins(state),
  loading: !getDataReceived(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  targetSymbol: getTargetSymbol(state),
  timezone: getTimezone(state),
  nextPage: getNextPage(state),
})

const mapDispatchToProps = dispatch => ({
  fetchFcredit: symbol => dispatch(actions.fetchFCredit(symbol)),
  fetchNextFCredit: () => dispatch(actions.fetchNextFCredit()),
  fetchPrevFCredit: () => dispatch(actions.fetchPrevFCredit()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  refresh: () => dispatch(actions.refresh()),
  setTargetSymbol: symbol => dispatch(actions.setTargetSymbol(symbol)),
})

const FundingCreditHistoryContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FundingCreditHistory))

export default FundingCreditHistoryContainer
