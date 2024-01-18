import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import {
  stopSyncNow,
  startSyncNow,
  setIsLongSync,
  showInitSyncPopup,
} from 'state/sync/actions'
import {
  getIsSyncing,
  getIsLongSync,
  getSyncProgress,
  getEstimatedSyncTime,
  getIsInitSyncPopupOpen,
} from 'state/sync/selectors'

import SyncMode from './SyncMode'

const mapStateToProps = state => ({
  isSyncing: getIsSyncing(state),
  isLongSync: getIsLongSync(state),
  syncProgress: getSyncProgress(state),
  estimatedSyncTime: getEstimatedSyncTime(state),
  isInitSyncPopupOpen: getIsInitSyncPopupOpen(state),
})

const mapDispatchToProps = {
  startSyncNow,
  stopSyncNow,
  setIsLongSync,
  showInitSyncPopup,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(SyncMode)
