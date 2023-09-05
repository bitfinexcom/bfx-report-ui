import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { removeUser } from 'state/auth/actions'
import { setTimezone } from 'state/base/actions'
import { getTimezone } from 'state/base/selectors'
import { getIsSyncing } from 'state/sync/selectors'
import { toggleExtraInfoDialog } from 'state/ui/actions'
import { getIsExtraInfoDialogOpen } from 'state/ui/selectors'

import ExtraInfoDialog from './ExtraInfoDialog'

const mapStateToProps = state => ({
  timezone: getTimezone(state),
  isSyncing: getIsSyncing(state),
  isOpen: getIsExtraInfoDialogOpen(state),
})

const mapDispatchToProps = {
  setTimezone,
  removeAccount: removeUser,
  toggleDialog: toggleExtraInfoDialog,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(ExtraInfoDialog)
