import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { toggleExportDialog } from 'state/ui/actions'

import Export from './Export'

const mapDispatchToProps = {
  toggleDialog: toggleExportDialog,
}

export default compose(
  connect(null, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(Export)
