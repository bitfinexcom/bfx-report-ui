import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getIsExportSuccessDialogOpen } from 'state/ui/selectors'
import { toggleExportSuccessDialog } from 'state/ui/actions'

import ExportSuccessDialog from './ExportSuccessDialog'

const mapStateToProps = state => ({
  isOpen: getIsExportSuccessDialogOpen(state),
})

const mapDispatchToProps = {
  toggleDialog: toggleExportSuccessDialog,
}

const ExportSuccessDialogContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ExportSuccessDialog))

export default ExportSuccessDialogContainer
