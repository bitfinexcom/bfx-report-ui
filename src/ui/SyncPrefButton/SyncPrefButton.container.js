import { connect } from 'react-redux'

import { setSyncPref } from 'state/sync/actions'
import { getStartTime, getSyncMode, getSyncPairs } from 'state/sync/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'

import SyncPrefButton from './SyncPrefButton'

const mapStateToProps = (state = {}) => {
  const { start } = getTimeFrame(getQuery(state))
  let pairs = getSyncPairs(state)
  if (!pairs.length) {
    pairs = ['BTC:USD']
  }
  return {
    syncMode: getSyncMode(state),
    syncPairs: pairs,
    startTime: getStartTime(state) || new Date(start).getTime(),
  }
}

const mapDispatchToProps = {
  setSyncPref: (pair, startTime, logout) => setSyncPref(pair, startTime.getTime(), logout),
}

const SyncPrefButtonContainer = connect(mapStateToProps, mapDispatchToProps)(SyncPrefButton)

export default SyncPrefButtonContainer
