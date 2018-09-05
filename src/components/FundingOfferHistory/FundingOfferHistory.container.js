import { connect } from 'react-redux'

import actions from 'state/fundingOfferHistory/actions'
import {
  getDataReceived,
  getEntries,
  getOffset,
  getPageLoading,
  getPageOffset,
} from 'state/fundingOfferHistory/selectors'

import FundingOfferHistory from './FundingOfferHistory'

const mapStateToProps = (state = {}) => ({
  offset: getOffset(state),
  entries: getEntries(state),
  loading: !getDataReceived(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
})

const mapDispatchToProps = dispatch => ({
  fetchFoffer: () => dispatch(actions.fetchFOffer()),
  fetchNextFOffer: () => dispatch(actions.fetchNextFOffer()),
  fetchPrevFOffer: () => dispatch(actions.fetchPrevFOffer()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
})

const FundingOfferHistoryContainer = connect(mapStateToProps, mapDispatchToProps)(FundingOfferHistory)

export default FundingOfferHistoryContainer
