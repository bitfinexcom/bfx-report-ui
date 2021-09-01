import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getLocalExportPath } from 'state/query/selectors'
import { toggleExportSuccessDialog } from 'state/ui/actions'
import { getIsExportSuccessDialogOpen } from 'state/ui/selectors'

import ExportSuccessDialog from './ExportSuccessDialog'

const mapStateToProps = state => ({
  isOpen: getIsExportSuccessDialogOpen(state),
  localExportPath: getLocalExportPath(state),
})

const mapDispatchToProps = {
  toggleDialog: toggleExportSuccessDialog,
}

const ExportSuccessDialogContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ExportSuccessDialog))

export default ExportSuccessDialogContainer
