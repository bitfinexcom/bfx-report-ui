import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'

import { getIsSyncing } from 'state/sync/selectors'
import { getTimeFrame } from 'state/timeRange/selectors'

import SyncPrefButton from './SyncPrefButton'

import { getSyncPref, getSyncPrefFunc } from './SyncPrefButton.helpers'

const mapStateToProps = (state, props) => {
  const { sectionType } = props

  const { pairs, startTime } = getSyncPref(state, sectionType)

  return {
    isSyncing: getIsSyncing(state),
    syncPairs: pairs,
    startTime: startTime || getTimeFrame(state).start,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { sectionType } = ownProps
  const setSyncPrefFunc = getSyncPrefFunc(sectionType)

  return {
    setSyncPref: (pair, startTime) => dispatch(setSyncPrefFunc(pair, startTime.getTime())),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(SyncPrefButton)
