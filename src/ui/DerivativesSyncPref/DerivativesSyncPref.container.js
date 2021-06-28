import { connect } from 'react-redux'

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

const DerivativesSyncPrefContainer = connect(mapStateToProps, mapDispatchToProps)(SyncPrefButton)

export default DerivativesSyncPrefContainer
