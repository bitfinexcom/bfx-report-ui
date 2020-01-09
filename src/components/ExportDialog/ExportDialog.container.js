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
import { toggleExportDialog } from 'state/ui/actions'
import { getIsExportDialogOpen } from 'state/ui/selectors'
import { exportCsv, prepareExport } from 'state/query/actions'

import ExportDialog from './ExportDialog'

const mapStateToProps = state => ({
  ...getTimeFrame(getQuery(state)),
  email: getExportEmail(state),
  getFullTime: getFullTime(state),
  loading: getPrepareExport(state),
  timezone: getTimezone(state),
  timestamp: getTimestamp(state),
  isOpen: getIsExportDialogOpen(state),
})

const mapDispatchToProps = {
  toggleDialog: toggleExportDialog,
  exportCsv,
  prepareExport,
}

const ExportDialogContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ExportDialog))

export default ExportDialogContainer
