import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  fetchData,
} from 'state/logins/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import {
  getEntries,
  getPageLoading,
  getDataReceived,
} from 'state/logins/selectors'
import queryConstants from 'state/query/constants'
import { getColumns } from 'state/filters/selectors'
import { getColumnsWidth } from 'state/columns/selectors'

import Logins from './Logins'

const mapStateToProps = state => ({
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
  columns: getColumns(state, queryConstants.MENU_LOGINS),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_LOGINS),
  entries: getFilteredEntries(state, queryConstants.MENU_LOGINS, getEntries(state)),
})

const mapDispatchToProps = {
  refresh,
  fetchData,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(Logins)
