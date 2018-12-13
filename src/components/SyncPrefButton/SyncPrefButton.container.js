import { connect } from 'react-redux'

import actions from 'state/sync/actions'
import authActions from 'state/auth/actions'
import { getStartTime, getSyncPairs } from 'state/sync/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'

import SyncPrefButton from './SyncPrefButton'

const mapStateToProps = (state = {}) => {
  const { start } = getTimeFrame(getQuery(state))
  let pairs = getSyncPairs(state)
  if (pairs.length === 0) {
    pairs = ['btcusd']
  }
  return {
    syncPairs: pairs,
    startTime: getStartTime(state) || new Date(start),
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
  setSyncPref: (pair, startTime) => dispatch(actions.setSyncPref(pair, startTime.getTime())),
})

const SyncPrefButtonContainer = connect(mapStateToProps, mapDispatchToProps)(SyncPrefButton)

export default SyncPrefButtonContainer
