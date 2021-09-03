import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(ExportSuccessDialog)
