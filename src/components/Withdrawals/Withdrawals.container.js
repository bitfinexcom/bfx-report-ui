import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/withdrawals/actions'
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
} from 'state/withdrawals/selectors'

import Withdrawals from './Withdrawals'

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

const mapDispatchToProps = dispatch => ({
  fetchWithdrawals: symbol => dispatch(actions.fetchWithdrawals(symbol)),
  fetchNext: queryLimit => dispatch(actions.fetchNextWithdrawals(queryLimit)),
  fetchPrev: queryLimit => dispatch(actions.fetchPrevWithdrawals(queryLimit)),
  jumpPage: (page, queryLimit) => dispatch(actions.jumpPage(page, queryLimit)),
  refresh: () => dispatch(actions.refresh()),
  addTargetSymbol: symbol => dispatch(actions.addTargetSymbol(symbol)),
  removeTargetSymbol: symbol => dispatch(actions.removeTargetSymbol(symbol)),
})

const WithdrawalsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Withdrawals))

export default WithdrawalsContainer
