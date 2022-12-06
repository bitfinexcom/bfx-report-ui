import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  setParams,
  fetchOrderTrades,
} from 'state/orderTrades/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getParams,
  getEntries,
  getPageLoading,
  getDataReceived,
} from 'state/orderTrades/selectors'

import OrderTrades from './OrderTrades'

const mapStateToProps = state => ({
  params: getParams(state),
  entries: getEntries(state),
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
})

const mapDispatchToProps = {
  refresh,
  setParams,
  fetchData: fetchOrderTrades,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(OrderTrades)
