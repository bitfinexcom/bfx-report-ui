import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchAffiliatesEarnings,
  fetchNextAffiliatesEarnings,
  fetchPrevAffiliatesEarnings,
  jumpPage,
  refresh,
  addTargetSymbol,
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

import AffiliatesEarnings from './AffiliatesEarnings'

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
  fetchAffiliatesearnings: fetchAffiliatesEarnings,
  fetchNext: fetchNextAffiliatesEarnings,
  fetchPrev: fetchPrevAffiliatesEarnings,
  jumpPage,
  refresh,
  addTargetSymbol,
  removeTargetSymbol,
}

const AffiliatesEarningsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AffiliatesEarnings))

export default AffiliatesEarningsContainer
