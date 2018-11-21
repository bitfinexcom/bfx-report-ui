import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/orders/actions'
import { getTimezone } from 'state/base/selectors'
import { getPairs } from 'state/symbols/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetPair,
  getNextPage,
} from 'state/orders/selectors'

import Orders from './Orders'

const mapStateToProps = (state = {}) => ({
  offset: getOffset(state),
  entries: getEntries(state),
  existingPairs: getExistingPairs(state),
  loading: !getDataReceived(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  pairs: getPairs(state),
  targetPair: getTargetPair(state),
  timezone: getTimezone(state),
  nextPage: getNextPage(state),
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: pair => dispatch(actions.fetchOrders(pair)),
  fetchNextOrders: () => dispatch(actions.fetchNextOrders()),
  fetchPrevOrders: () => dispatch(actions.fetchPrevOrders()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  refresh: () => dispatch(actions.refresh()),
  setTargetPair: pair => dispatch(actions.setTargetPair(pair)),
})

const OrdersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders))

export default OrdersContainer
