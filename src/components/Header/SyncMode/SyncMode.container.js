import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { startSyncNow, stopSyncNow } from 'state/sync/actions'
import { getSyncProgress, getIsSyncing, getEstimatedSyncTime } from 'state/sync/selectors'

import SyncMode from './SyncMode'

const mapStateToProps = state => ({
  isSyncing: getIsSyncing(state),
  syncProgress: getSyncProgress(state),
  estimatedSyncTime: getEstimatedSyncTime(state),
})

const mapDispatchToProps = {
  startSyncNow,
  stopSyncNow,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(SyncMode)
