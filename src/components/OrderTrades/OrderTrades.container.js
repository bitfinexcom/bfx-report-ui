import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchOrderTrades,
  refresh,
  setParams,
} from 'state/orderTrades/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getDataReceived,
  getEntries,
  getPageLoading,
  getParams,
} from 'state/orderTrades/selectors'

import OrderTrades from './OrderTrades'

const mapStateToProps = state => ({
  entries: getEntries(state),
  getFullTime: getFullTime(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  params: getParams(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchOrdertrades: fetchOrderTrades,
  refresh,
  setParams,
}

const OrderTradesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderTrades))

export default OrderTradesContainer
