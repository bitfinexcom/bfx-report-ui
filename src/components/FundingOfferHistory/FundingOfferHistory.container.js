import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/fundingOfferHistory/actions'
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
} from 'state/fundingOfferHistory/selectors'

import FundingOfferHistory from './FundingOfferHistory'

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
  fetchFoffer: symbol => dispatch(actions.fetchFOffer(symbol)),
  fetchNext: queryLimit => dispatch(actions.fetchNextFOffer(queryLimit)),
  fetchPrev: queryLimit => dispatch(actions.fetchPrevFOffer(queryLimit)),
  jumpPage: (page, queryLimit) => dispatch(actions.jumpPage(page, queryLimit)),
  refresh: () => dispatch(actions.refresh()),
  addTargetSymbol: symbol => dispatch(actions.addTargetSymbol(symbol)),
  removeTargetSymbol: symbol => dispatch(actions.removeTargetSymbol(symbol)),
})

const FundingOfferHistoryContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FundingOfferHistory))

export default FundingOfferHistoryContainer
