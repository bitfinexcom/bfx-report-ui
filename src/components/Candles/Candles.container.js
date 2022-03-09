import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  fetchData,
  refresh,
  setParams,
} from 'state/candles/actions'
import { toggleGoToRangeDialog } from 'state/ui/actions'
import { getPairs } from 'state/symbols/selectors'
import {
  getCandles,
  getCurrentFetchParams,
  getDataReceived,
  getPageLoading,
  getChartLoading,
  getParams,
  getTrades,
} from 'state/candles/selectors'

import Candles from './Candles'

const mapStateToProps = state => ({
  currentFetchParams: getCurrentFetchParams(state),
  candles: getCandles(state),
  trades: getTrades(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  pairs: getPairs(state),
  params: getParams(state),
  isChartLoading: getChartLoading(state),
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
