import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchData,
  refresh,
} from 'state/changeLogs/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import {
  getDataReceived,
  getEntries,
  getPageLoading,
} from 'state/changeLogs/selectors'
import { getColumns } from 'state/filters/selectors'
import queryConstants from 'state/query/constants'

import ChangeLogs from './ChangeLogs'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_CHANGE_LOGS),
  entries: getFilteredEntries(state, queryConstants.MENU_CHANGE_LOGS, getEntries(state)),
  getFullTime: getFullTime(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchData,
  refresh,
}

const ChangeLogsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangeLogs))

export default ChangeLogsContainer
