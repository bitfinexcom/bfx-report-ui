import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { getFullTime, getTimezone } from 'state/base/selectors'
import { getExportEmail } from 'state/query/selectors'
import { getTimeFrame } from 'state/timeRange/selectors'
import { getTimestamp } from 'state/wallets/selectors'
import { toggleExportDialog } from 'state/ui/actions'
import { getIsExportDialogOpen } from 'state/ui/selectors'
import { exportCsv, prepareExport } from 'state/query/actions'

import ExportDialog from './ExportDialog'

const mapStateToProps = state => ({
  ...getTimeFrame(state),
  email: getExportEmail(state),
  timezone: getTimezone(state),
  timestamp: getTimestamp(state),
  getFullTime: getFullTime(state),
  isOpen: getIsExportDialogOpen(state),
})

const mapDispatchToProps = {
  exportCsv,
  prepareExport,
  toggleDialog: toggleExportDialog,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(ExportDialog)
