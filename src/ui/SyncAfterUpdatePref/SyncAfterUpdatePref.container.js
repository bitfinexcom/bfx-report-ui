import { connect } from 'react-redux'

import { syncAfterUpdate } from 'state/auth/actions'
import { getShouldNotSyncOnStartupAfterUpdate } from 'state/auth/selectors'

import SyncAfterUpdatePref from './SyncAfterUpdatePref'

const mapStateToProps = state => ({
  shouldSyncAfterUpdate: !getShouldNotSyncOnStartupAfterUpdate(state),
})

const mapDispatchToProps = {
  syncAfterUpdate,
}

const SyncAfterUpdatePrefContainer = connect(mapStateToProps, mapDispatchToProps)(SyncAfterUpdatePref)

export default SyncAfterUpdatePrefContainer
