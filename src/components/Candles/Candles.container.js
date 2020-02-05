import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchData,
  refresh,
  setParams,
} from 'state/candles/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getPairs } from 'state/symbols/selectors'
import {
  getCurrentFetchParams,
  getDataReceived,
  getEntries,
  getPageLoading,
  getParams,
  getTradesEntries,
} from 'state/candles/selectors'

import Candles from './Candles'

const mapStateToProps = state => ({
  currentFetchParams: getCurrentFetchParams(state),
  entries: getEntries(state),
  tradesEntries: getTradesEntries(state),
  getFullTime: getFullTime(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  pairs: getPairs(state),
  params: getParams(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchData,
  refresh,
  setParams,
}

const CandlesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Candles))

export default CandlesContainer
