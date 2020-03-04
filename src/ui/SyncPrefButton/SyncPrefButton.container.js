import { connect } from 'react-redux'

import { getSyncMode } from 'state/sync/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'

import SyncPrefButton from './SyncPrefButton'

import { getSyncPref, getSyncPrefFunc } from './SyncPrefButton.helpers'

const mapStateToProps = (state, props) => {
  const { sectionType } = props

  const { pairs, startTime } = getSyncPref(state, sectionType)
  const { start } = getTimeFrame(getQuery(state))

  return {
    syncMode: getSyncMode(state),
    syncPairs: pairs,
    startTime: startTime || new Date(start).getTime(),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { sectionType } = ownProps
  const setSyncPrefFunc = getSyncPrefFunc(sectionType)

  return {
    setSyncPref: (pair, startTime) => dispatch(setSyncPrefFunc(pair, startTime.getTime())),
  }
}

const SyncPrefButtonContainer = connect(mapStateToProps, mapDispatchToProps)(SyncPrefButton)

export default SyncPrefButtonContainer
