import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchPublicTrades,
  refresh,
  setTargetPair,
} from 'state/publicTrades/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import {
  getDataReceived,
  getEntries,
  getPageLoading,
  getTargetPair,
} from 'state/publicTrades/selectors'
import { getColumns } from 'state/filters/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import queryConstants from 'state/query/constants'

import PublicTrades from './PublicTrades'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_PUBLIC_TRADES),
  entries: getFilteredEntries(state, queryConstants.MENU_PUBLIC_TRADES, getEntries(state)),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_PUBLIC_TRADES),
  getFullTime: getFullTime(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  targetPair: getTargetPair(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchData: fetchPublicTrades,
  refresh,
  setTargetPair,
}

const PublicTradesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PublicTrades))

export default PublicTradesContainer
