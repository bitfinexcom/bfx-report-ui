import { connect } from 'react-redux'

import actions from 'state/orders/actions'

import Orders from './Orders'

function mapStateToProps(state = {}) {
  return {
    offset: state.orders.offset,
    entries: state.orders.entries,
    loading: !state.orders.dataReceived,
    pageOffset: state.orders.pageOffset,
    pageLoading: state.orders.pageLoading,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(actions.fetchOrders()),
  fetchNextOrders: () => dispatch(actions.fetchNextOrders()),
  fetchPrevOrders: () => dispatch(actions.fetchPrevOrders()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
})

const OrdersContainer = connect(mapStateToProps, mapDispatchToProps)(Orders)

export default OrdersContainer
