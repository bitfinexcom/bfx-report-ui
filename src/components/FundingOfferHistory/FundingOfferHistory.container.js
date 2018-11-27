import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/fundingOfferHistory/actions'
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
} from 'state/fundingOfferHistory/selectors'

import FundingOfferHistory from './FundingOfferHistory'

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
  fetchFoffer: symbol => dispatch(actions.fetchFOffer(symbol)),
  fetchNext: () => dispatch(actions.fetchNextFOffer()),
  fetchPrev: () => dispatch(actions.fetchPrevFOffer()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  refresh: () => dispatch(actions.refresh()),
  addTargetSymbol: symbol => dispatch(actions.addTargetSymbol(symbol)),
  removeTargetSymbol: symbol => dispatch(actions.removeTargetSymbol(symbol)),
})

const FundingOfferHistoryContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FundingOfferHistory))

export default FundingOfferHistoryContainer
