import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { startSyncNow } from 'state/sync/actions'
import { toggleErrorDialog, disableErrorDialog } from 'state/ui/actions'
import {
  getIsErrorDialogOpen,
  getIsErrorDialogDisabled,
  getErrorDialogMessage,
} from 'state/ui/selectors'
import { getIsSyncing } from 'state/sync/selectors'

import ErrorDialog from './ErrorDialog'

const mapStateToProps = state => ({
  isSyncing: getIsSyncing(state),
  isOpen: getIsErrorDialogOpen(state),
  isDisabled: getIsErrorDialogDisabled(state),
  errorMessage: getErrorDialogMessage(state),
})

const mapDispatchToProps = {
  startSync: startSyncNow,
  toggleDialog: toggleErrorDialog,
  disableDialog: disableErrorDialog,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(ErrorDialog)
