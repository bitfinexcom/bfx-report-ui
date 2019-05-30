import { connect } from 'react-redux'

import { startSyncing, stopSyncing } from 'state/sync/actions'
import { getSyncMode } from 'state/sync/selectors'

import SyncMode from './SyncMode'

const mapStateToProps = (state = {}) => ({
  syncMode: getSyncMode(state),
})

const mapDispatchToProps = {
  startSyncing,
  stopSyncing,
}

const SyncModeContainer = connect(mapStateToProps, mapDispatchToProps)(SyncMode)

export default SyncModeContainer
