import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchLedgers,
  fetchNextLedgers,
  fetchPrevLedgers,
  jumpPage,
  refresh,
  addTargetSymbol,
  removeTargetSymbol,
} from 'state/ledgers/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getTargetQueryLimit } from 'state/query/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbols,
  getNextPage,
} from 'state/ledgers/selectors'

import Ledgers from './Ledgers'

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
  getQueryLimit: getTargetQueryLimit(state),
})

const mapDispatchToProps = {
  fetchLedgers,
  fetchNext: fetchNextLedgers,
  fetchPrev: fetchPrevLedgers,
  jumpPage,
  refresh,
  addTargetSymbol,
  removeTargetSymbol,
}

const LedgersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Ledgers))

export default LedgersContainer
