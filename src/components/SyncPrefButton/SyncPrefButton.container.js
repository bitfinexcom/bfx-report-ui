import { connect } from 'react-redux'

import actions from 'state/sync/actions'
import { getStartTime, getSyncPairs } from 'state/sync/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'

import SyncPrefButton from './SyncPrefButton'

const mapStateToProps = (state = {}) => {
  const { start } = getTimeFrame(getQuery(state))
  console.warn(start)
  let pairs = getSyncPairs(state)
  if (pairs.length === 0) {
    pairs = ['btcusd']
  }
  return {
    syncPairs: pairs,//getSyncPairs(state) || ['btcusd'],
    startTime: getStartTime(state) || new Date(start),
  }
}

const mapDispatchToProps = dispatch => ({
  setPairs: (pair, startTime) => dispatch(actions.setPref(pair, startTime)),
})

const SyncPrefButtonContainer = connect(mapStateToProps, mapDispatchToProps)(SyncPrefButton)

export default SyncPrefButtonContainer
