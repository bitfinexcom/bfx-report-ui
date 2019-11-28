import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchAffiliatesEarnings,
  fetchNextAffiliatesEarnings,
  fetchPrevAffiliatesEarnings,
  jumpPage,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
} from 'state/affiliatesEarnings/actions'
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
} from 'state/affiliatesEarnings/selectors'
import { getColumns } from 'state/filters/selectors'
import queryConstants from 'state/query/constants'

import AffiliatesEarnings from './AffiliatesEarnings'

const mapStateToProps = (state = {}) => ({
  columns: getColumns(state, queryConstants.MENU_AFFILIATES_EARNINGS),
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
  fetchAffiliatesearnings: fetchAffiliatesEarnings,
  fetchNext: fetchNextAffiliatesEarnings,
  fetchPrev: fetchPrevAffiliatesEarnings,
  jumpPage,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
}

const AffiliatesEarningsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AffiliatesEarnings))

export default AffiliatesEarningsContainer
