import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchTrades,
  refresh,
  addTargetPair,
  removeTargetPair, setTargetPairs,
} from 'state/trades/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getPageLoading,
  getTargetPairs,
} from 'state/trades/selectors'
import { getColumns } from 'state/filters/selectors'
import queryConstants from 'state/query/constants'

import Trades from './Trades'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_TRADES),
  entries: getFilteredEntries(state, queryConstants.MENU_TRADES, getEntries(state)),
  existingPairs: getExistingPairs(state),
  getFullTime: getFullTime(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  targetPairs: getTargetPairs(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchData: fetchTrades,
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
}

const TradesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Trades))

export default TradesContainer
