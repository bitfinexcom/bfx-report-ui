import { connect } from 'react-redux'

import { getTimezone } from 'state/base/selectors'
import {
  getEmail,
  getPrepareExport,
  getQuery,
  getTimeFrame,
} from 'state/query/selectors'

import ExportDialog from './ExportDialog'

const mapStateToProps = (state = {}) => ({
  ...getTimeFrame(getQuery(state)),
  email: getEmail(state),
  loading: getPrepareExport(state),
  timezone: getTimezone(state),
})

const ExportDialogContainer = connect(mapStateToProps)(ExportDialog)

export default ExportDialogContainer
