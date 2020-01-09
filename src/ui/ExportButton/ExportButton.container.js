import { connect } from 'react-redux'

import { toggleExportDialog } from 'state/ui/actions'

import ExportButton from './ExportButton'

const mapDispatchToProps = {
  toggleDialog: toggleExportDialog,
}

const ExportButtonContainer = connect(null, mapDispatchToProps)(ExportButton)

export default ExportButtonContainer
