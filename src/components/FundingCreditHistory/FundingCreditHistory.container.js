import { connect } from 'react-redux'

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
})

const mapDispatchToProps = dispatch => ({
  fetchFcredit: () => dispatch(actions.fetchFCredit()),
  fetchNextFCredit: () => dispatch(actions.fetchNextFCredit()),
  fetchPrevFCredit: () => dispatch(actions.fetchPrevFCredit()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  refresh: () => dispatch(actions.refresh()),
  setTargetSymbol: symbol => dispatch(actions.setTargetSymbol(symbol)),
})

const FundingCreditHistoryContainer = connect(mapStateToProps, mapDispatchToProps)(FundingCreditHistory)

export default FundingCreditHistoryContainer
