import { connect } from 'react-redux'

import actions from 'state/sync/actions'
import { getSyncMode } from 'state/sync/selectors'

import SyncMode from './SyncMode'

const mapStateToProps = (state = {}) => ({
  syncMode: getSyncMode(state),
})

const mapDispatchToProps = dispatch => ({
  startSyncing: () => dispatch(actions.startSyncing()),
  stopSyncing: () => dispatch(actions.stopSyncing()),
})

const SyncModeContainer = connect(mapStateToProps, mapDispatchToProps)(SyncMode)

export default SyncModeContainer
