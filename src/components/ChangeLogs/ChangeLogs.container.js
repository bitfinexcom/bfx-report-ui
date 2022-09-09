import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  fetchData,
} from 'state/changeLogs/actions'
import queryConstants from 'state/query/constants'
import { getColumns } from 'state/filters/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getEntries,
  getPageLoading,
  getDataReceived,
} from 'state/changeLogs/selectors'

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
  refresh,
  fetchData,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(ChangeLogs)
