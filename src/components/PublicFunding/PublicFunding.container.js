import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/publicFunding/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getCoins, getCurrencies } from 'state/symbols/selectors'
import { hasSyncPref } from 'state/sync/selectors'
import {
  getDataReceived,
  getEntries,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbol,
  getNextPage,
} from 'state/publicFunding/selectors'

import PublicFunding from './PublicFunding'

const mapStateToProps = (state = {}) => ({
  coins: getCoins(state),
  currencies: getCurrencies(state),
  entries: getEntries(state),
  getFullTime: getFullTime(state),
  hasSyncPref: hasSyncPref(state),
  loading: !getDataReceived(state),
  nextPage: getNextPage(state),
  offset: getOffset(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  targetSymbol: getTargetSymbol(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPublicfunding: symbol => dispatch(actions.fetchPublicFunding(symbol)),
  fetchNext: queryLimit => dispatch(actions.fetchNextPublicFunding(queryLimit)),
  fetchPrev: queryLimit => dispatch(actions.fetchPrevPublicFunding(queryLimit)),
  jumpPage: (page, queryLimit) => dispatch(actions.jumpPage(page, queryLimit)),
  refresh: () => dispatch(actions.refresh()),
  setTargetSymbol: symbol => dispatch(actions.setTargetSymbol(symbol)),
})

const PublicFundingContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PublicFunding))

export default PublicFundingContainer
