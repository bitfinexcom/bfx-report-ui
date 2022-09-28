import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  fetchData,
  setParams,
} from 'state/candles/actions'
import { getPairs } from 'state/symbols/selectors'
import { toggleGoToRangeDialog } from 'state/ui/actions'
import {
  getParams,
  getTrades,
  getCandles,
  getPageLoading,
  getChartLoading,
  getDataReceived,
  getCurrentFetchParams,
} from 'state/candles/selectors'

import Candles from './Candles'

const mapStateToProps = state => ({
  candles: getCandles(state),
  currentFetchParams: getCurrentFetchParams(state),
  dataReceived: getDataReceived(state),
  isChartLoading: getChartLoading(state),
  pairs: getPairs(state),
  pageLoading: getPageLoading(state),
  params: getParams(state),
  trades: getTrades(state),
})

const mapDispatchToProps = {
  fetchData,
  refresh,
  setParams,
  toggleGoToRangeDialog,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(Candles)
