import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getFullTime, getTimezone } from 'state/base/selectors'
import {
  getExportEmail,
  getPrepareExport,
  getQuery,
  getTimeFrame,
} from 'state/query/selectors'
import { getTimestamp } from 'state/wallets/selectors'

import ExportDialog from './ExportDialog'

const mapStateToProps = (state = {}) => ({
  ...getTimeFrame(getQuery(state)),
  email: getExportEmail(state),
  getFullTime: getFullTime(state),
  loading: getPrepareExport(state),
  timezone: getTimezone(state),
  timestamp: getTimestamp(state),
})

const ExportDialogContainer = withRouter(connect(mapStateToProps)(ExportDialog))

export default ExportDialogContainer
