import { connect } from 'react-redux'

import actions from 'state/orders/actions'
import {
  getDataReceived,
  getEntries,
  getOffset,
  getPageLoading,
  getPageOffset,
} from 'state/orders/selectors'

import Orders from './Orders'

const mapStateToProps = (state = {}) => ({
  offset: getOffset(state),
  entries: getEntries(state),
  loading: !getDataReceived(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(actions.fetchOrders()),
  fetchNextOrders: () => dispatch(actions.fetchNextOrders()),
  fetchPrevOrders: () => dispatch(actions.fetchPrevOrders()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  refresh: () => dispatch(actions.refresh()),
})

const OrdersContainer = connect(mapStateToProps, mapDispatchToProps)(Orders)

export default OrdersContainer
