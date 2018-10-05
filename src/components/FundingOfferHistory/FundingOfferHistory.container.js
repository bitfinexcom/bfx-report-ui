import { connect } from 'react-redux'

import actions from 'state/fundingOfferHistory/actions'
import { getTimezone } from 'state/base/selectors'
import { getCoins } from 'state/symbols/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbol,
} from 'state/fundingOfferHistory/selectors'

import FundingOfferHistory from './FundingOfferHistory'

const mapStateToProps = (state = {}) => ({
  coins: getCoins(state),
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
  fetchFoffer: () => dispatch(actions.fetchFOffer()),
  fetchNextFOffer: () => dispatch(actions.fetchNextFOffer()),
  fetchPrevFOffer: () => dispatch(actions.fetchPrevFOffer()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  refresh: () => dispatch(actions.refresh()),
  setTargetSymbol: symbol => dispatch(actions.setTargetSymbol(symbol)),
})

const FundingOfferHistoryContainer = connect(mapStateToProps, mapDispatchToProps)(FundingOfferHistory)

export default FundingOfferHistoryContainer
