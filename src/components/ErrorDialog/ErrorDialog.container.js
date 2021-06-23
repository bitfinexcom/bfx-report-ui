import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { toggleErrorDialog } from 'state/ui/actions'
import { getIsErrorDialogOpen, getErrorDialogMessage } from 'state/ui/selectors'

import ErrorDialog from './ErrorDialog'

const mapStateToProps = state => ({
  isOpen: getIsErrorDialogOpen(state),
  errorMessage: getErrorDialogMessage(state),
})

const mapDispatchToProps = {
  toggleDialog: toggleErrorDialog,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(ErrorDialog)
