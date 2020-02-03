import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchData,
  refresh,
  setParams,
} from 'state/logins/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getCurrentFetchParams,
  getDataReceived,
  getEntries,
  getPageLoading,
  getParams,
} from 'state/logins/selectors'
import { getColumns } from 'state/filters/selectors'
import queryConstants from 'state/query/constants'

import Logins from './Logins'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_LOGINS),
  currentFetchParams: getCurrentFetchParams(state),
  entries: getEntries(state),
  params: getParams(state),
  getFullTime: getFullTime(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchData,
  refresh,
  setParams,
}

const LoginsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Logins))

export default LoginsContainer
