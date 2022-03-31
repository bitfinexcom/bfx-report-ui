import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchOrders,
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
  clearTargetPairs,
} from 'state/orders/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getPageLoading,
  getTargetPairs,
} from 'state/orders/selectors'
import { getColumns } from 'state/filters/selectors'
import queryConstants from 'state/query/constants'

import Orders from './Orders'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_ORDERS),
  entries: getFilteredEntries(state, queryConstants.MENU_ORDERS, getEntries(state)),
  existingPairs: getExistingPairs(state),
  getFullTime: getFullTime(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  targetPairs: getTargetPairs(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchData: fetchOrders,
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
  clearTargetPairs,
}

const OrdersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders))

export default OrdersContainer
