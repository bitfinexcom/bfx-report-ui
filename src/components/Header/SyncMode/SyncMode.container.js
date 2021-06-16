import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'

import { startSyncNow, stopSyncNow, switchSyncMode } from 'state/sync/actions'
import { getSyncMode, getSyncProgress } from 'state/sync/selectors'

import SyncMode from './SyncMode'

const mapStateToProps = state => ({
  syncMode: getSyncMode(state),
  syncProgress: getSyncProgress(state),
})

const mapDispatchToProps = {
  switchSyncMode,
  startSyncNow,
  stopSyncNow,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(SyncMode)
