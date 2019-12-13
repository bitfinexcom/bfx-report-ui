import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchOrders,
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
} from 'state/orders/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getTargetPairs,
} from 'state/orders/selectors'
import { getColumns } from 'state/filters/selectors'
import queryConstants from 'state/query/constants'

import Orders from './Orders'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_ORDERS),
  entries: getEntries(state),
  existingPairs: getExistingPairs(state),
  getFullTime: getFullTime(state),
  loading: !getDataReceived(state),
  targetPairs: getTargetPairs(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchOrders,
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
}

const OrdersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders))

export default OrdersContainer
