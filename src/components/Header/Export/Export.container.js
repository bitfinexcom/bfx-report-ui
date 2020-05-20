import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { toggleExportDialog } from 'state/ui/actions'

import Export from './Export'

const mapDispatchToProps = {
  toggleDialog: toggleExportDialog,
}

const ExportContainer = withRouter(connect(null, mapDispatchToProps)(Export))

export default ExportContainer
