import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'

import { setSyncMode, startSyncing, stopSyncing } from 'state/sync/actions'
import { getSyncMode, getSyncProgress } from 'state/sync/selectors'

import SyncMode from './SyncMode'

const mapStateToProps = state => ({
  syncMode: getSyncMode(state),
  syncProgress: getSyncProgress(state),
})

const mapDispatchToProps = {
  setSyncMode,
  startSyncing,
  stopSyncing,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(SyncMode)
