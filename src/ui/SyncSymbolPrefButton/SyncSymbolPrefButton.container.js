import { connect } from 'react-redux'

import actions from 'state/sync/actions'
import { getStartTime, getSyncMode, getSyncSymbols } from 'state/sync/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { getTimezone } from 'state/base/selectors'

import SyncSymbolPrefButton from './SyncSymbolPrefButton'

const mapStateToProps = (state = {}) => {
  const { start } = getTimeFrame(getQuery(state))
  let symbols = getSyncSymbols(state)
  if (symbols.length === 0) {
    symbols = ['usd']
  }
  return {
    syncMode: getSyncMode(state),
    syncSymbols: symbols,
    startTime: getStartTime(state) || new Date(start).getTime(),
    timezone: getTimezone(state),
  }
}

const mapDispatchToProps = dispatch => ({
  setSyncPref: (symbol, startTime, logout) => dispatch(actions.setSyncSymbolPref(symbol, startTime.getTime(), logout)),
})

const SyncSymbolPrefButtonContainer = connect(mapStateToProps, mapDispatchToProps)(SyncSymbolPrefButton)

export default SyncSymbolPrefButtonContainer
