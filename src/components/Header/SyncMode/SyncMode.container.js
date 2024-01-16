import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import {
  stopSyncNow,
  startSyncNow,
  showInitSyncPopup,
} from 'state/sync/actions'
import {
  getIsSyncing,
  getSyncProgress,
  getEstimatedSyncTime,
  getIsInitSyncPopupOpen,
} from 'state/sync/selectors'

import SyncMode from './SyncMode'

const mapStateToProps = state => ({
  isSyncing: getIsSyncing(state),
  syncProgress: getSyncProgress(state),
  estimatedSyncTime: getEstimatedSyncTime(state),
  isInitSyncPopupOpen: getIsInitSyncPopupOpen(state),
})

const mapDispatchToProps = {
  startSyncNow,
  stopSyncNow,
  showInitSyncPopup,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(SyncMode)
