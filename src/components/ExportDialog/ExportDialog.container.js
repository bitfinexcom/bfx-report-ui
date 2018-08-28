import { connect } from 'react-redux'

import {
  getEmail,
  getPrepareExport,
  getQuery,
  getTimeFrame,
} from 'state/query/selectors'

import ExportDialog from './ExportDialog'

function mapStateToProps(state = {}) {
  return {
    ...getTimeFrame(getQuery(state)),
    email: getEmail(state),
    loading: getPrepareExport(state),
  }
}

const ExportDialogContainer = connect(mapStateToProps)(ExportDialog)

export default ExportDialogContainer
