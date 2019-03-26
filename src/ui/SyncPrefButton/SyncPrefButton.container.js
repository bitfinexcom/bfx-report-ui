import { connect } from 'react-redux'

import actions from 'state/sync/actions'
import { getStartTime, getSyncMode, getSyncPairs } from 'state/sync/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { getTimezone } from 'state/base/selectors'

import SyncPrefButton from './SyncPrefButton'

const mapStateToProps = (state = {}) => {
  const { start } = getTimeFrame(getQuery(state))
  let pairs = getSyncPairs(state)
  if (pairs.length === 0) {
    pairs = ['btcusd']
  }
  return {
    syncMode: getSyncMode(state),
    syncPairs: pairs,
    startTime: getStartTime(state) || new Date(start).getTime(),
    timezone: getTimezone(state),
  }
}

const mapDispatchToProps = dispatch => ({
  setSyncPref: (pair, startTime, logout) => dispatch(actions.setSyncPref(pair, startTime.getTime(), logout)),
})

const SyncPrefButtonContainer = connect(mapStateToProps, mapDispatchToProps)(SyncPrefButton)

export default SyncPrefButtonContainer
