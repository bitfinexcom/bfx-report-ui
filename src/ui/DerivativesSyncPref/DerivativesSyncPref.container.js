import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'

import { getStatusMessagesConf, getIsSyncing } from 'state/sync/selectors'
import { editStatusMessagesConf } from 'state/sync/actions'

import SyncPrefButton from './DerivativesSyncPref'

const mapStateToProps = (state) => ({
  isSyncing: getIsSyncing(state),
  syncPairs: getStatusMessagesConf(state),
})

const mapDispatchToProps = {
  setSyncPref: editStatusMessagesConf,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(SyncPrefButton)
