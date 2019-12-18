import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchTickers,
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
} from 'state/tickers/actions'
import { updateErrorStatus } from 'state/status/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getTickersHistoryPairs } from 'state/sync/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getPageLoading,
  getTargetPairs,
} from 'state/tickers/selectors'
import { getColumns } from 'state/filters/selectors'
import queryConstants from 'state/query/constants'

import Tickers from './Tickers'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_TICKERS),
  entries: getFilteredEntries(state, queryConstants.MENU_TICKERS, getEntries(state)),
  existingPairs: getExistingPairs(state),
  getFullTime: getFullTime(state),
  hasSyncPref: !!getTickersHistoryPairs(state).length,
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  targetPairs: getTargetPairs(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchTickers,
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
  updateErrorStatus,
}

const TickersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Tickers))

export default TickersContainer
