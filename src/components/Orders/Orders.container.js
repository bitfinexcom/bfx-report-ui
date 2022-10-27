import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  fetchOrders,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
  clearTargetPairs,
} from 'state/orders/actions'
import { getFilteredEntries } from 'state/pagination/selectors'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getEntries,
  getPageLoading,
  getTargetPairs,
  getDataReceived,
  getExistingPairs,
} from 'state/orders/selectors'
import queryConstants from 'state/query/constants'
import { getColumns } from 'state/filters/selectors'
import { getColumnsWidth } from 'state/columns/selectors'

import Orders from './Orders'

const mapStateToProps = state => ({
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
  targetPairs: getTargetPairs(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
  existingPairs: getExistingPairs(state),
  columns: getColumns(state, queryConstants.MENU_ORDERS),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_ORDERS),
  entries: getFilteredEntries(state, queryConstants.MENU_ORDERS, getEntries(state)),
})

const mapDispatchToProps = {
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
  clearTargetPairs,
  fetchData: fetchOrders,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(Orders)
