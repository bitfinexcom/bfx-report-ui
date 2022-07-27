import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchData,
  refresh,
} from 'state/logins/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import {
  getDataReceived,
  getEntries,
  getPageLoading,
} from 'state/logins/selectors'
import { getColumns } from 'state/filters/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import queryConstants from 'state/query/constants'

import Logins from './Logins'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_LOGINS),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_LOGINS),
  entries: getFilteredEntries(state, queryConstants.MENU_LOGINS, getEntries(state)),
  getFullTime: getFullTime(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchData,
  refresh,
}

const LoginsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Logins))

export default LoginsContainer
