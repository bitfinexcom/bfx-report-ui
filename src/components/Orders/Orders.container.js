import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchOrders,
  fetchNextOrders,
  fetchPrevOrders,
  jumpPage,
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
} from 'state/orders/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getTargetQueryLimit } from 'state/query/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetPairs,
} from 'state/orders/selectors'

import Orders from './Orders'

const mapStateToProps = (state = {}) => ({
  entries: getEntries(state),
  existingPairs: getExistingPairs(state),
  getFullTime: getFullTime(state),
  getQueryLimit: getTargetQueryLimit(state),
  loading: !getDataReceived(state),
  nextPage: getNextPage(state),
  offset: getOffset(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  targetPairs: getTargetPairs(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchOrders,
  fetchNext: fetchNextOrders,
  fetchPrev: fetchPrevOrders,
  jumpPage,
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
}

const OrdersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders))

export default OrdersContainer
