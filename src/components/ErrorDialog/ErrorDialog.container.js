import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { toggleFrameworkDialog } from 'state/ui/actions'
import { getIsFrameworkDialogOpen } from 'state/ui/selectors'

import ErrorDialog from './ErrorDialog'

const mapStateToProps = state => ({
  isOpen: getIsFrameworkDialogOpen(state),
})

const mapDispatchToProps = {
  toggleDialog: toggleFrameworkDialog,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(ErrorDialog)
