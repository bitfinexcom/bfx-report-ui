import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchPublicFunding,
  fetchNextPublicFunding,
  fetchPrevPublicFunding,
  jumpPage,
  refresh,
  setTargetSymbol,
} from 'state/publicFunding/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getCoins, getCurrencies } from 'state/symbols/selectors'
import { getPublicFundingSymbols } from 'state/sync/selectors'
import {
  getDataReceived,
  getEntries,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbol,
  getNextPage,
} from 'state/publicFunding/selectors'
import { getColumns } from 'state/filters/selectors'
import queryConstants from 'state/query/constants'

import PublicFunding from './PublicFunding'

const mapStateToProps = (state = {}) => ({
  columns: getColumns(state, queryConstants.MENU_PUBLIC_FUNDING),
  coins: getCoins(state),
  currencies: getCurrencies(state),
  entries: getEntries(state),
  getFullTime: getFullTime(state),
  hasSyncPref: !!getPublicFundingSymbols(state).length,
  loading: !getDataReceived(state),
  nextPage: getNextPage(state),
  offset: getOffset(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  targetSymbol: getTargetSymbol(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchPublicfunding: fetchPublicFunding,
  fetchNext: fetchNextPublicFunding,
  fetchPrev: fetchPrevPublicFunding,
  jumpPage,
  refresh,
  setTargetSymbol,
}

const PublicFundingContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PublicFunding))

export default PublicFundingContainer
