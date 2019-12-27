import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchPublicTrades,
  refresh,
  setTargetPair,
} from 'state/publicTrades/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getPairs } from 'state/symbols/selectors'
import { getPublicTradesPairs } from 'state/sync/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import {
  getDataReceived,
  getEntries,
  getPageLoading,
  getTargetPair,
} from 'state/publicTrades/selectors'
import { getColumns } from 'state/filters/selectors'
import queryConstants from 'state/query/constants'

import PublicTrades from './PublicTrades'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_PUBLIC_TRADES),
  entries: getFilteredEntries(state, queryConstants.MENU_PUBLIC_TRADES, getEntries(state)),
  getFullTime: getFullTime(state),
  hasSyncPref: !!getPublicTradesPairs(state).length,
  loading: !getDataReceived(state),
  pageLoading: getPageLoading(state),
  pairs: getPairs(state),
  targetPair: getTargetPair(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchPublictrades: fetchPublicTrades,
  refresh,
  setTargetPair,
}

const PublicTradesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PublicTrades))

export default PublicTradesContainer
