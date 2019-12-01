import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchFOffer,
  fetchNextFOffer,
  fetchPrevFOffer,
  jumpPage,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
} from 'state/fundingOfferHistory/actions'
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
import { getColumns } from 'state/filters/selectors'
import queryConstants from 'state/query/constants'

import FundingOfferHistory from './FundingOfferHistory'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_FOFFER),
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

const mapDispatchToProps = {
  fetchFoffer: fetchFOffer,
  fetchNext: fetchNextFOffer,
  fetchPrev: fetchPrevFOffer,
  jumpPage,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
}

const FundingOfferHistoryContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FundingOfferHistory))

export default FundingOfferHistoryContainer
