import { connect } from 'react-redux'

import { editSyncSymbolPref } from 'state/sync/actions'
import { getStartTime, getSyncMode, getSyncSymbols } from 'state/sync/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'

import SyncSymbolPrefButton from './SyncSymbolPrefButton'

const mapStateToProps = (state = {}) => {
  const { start } = getTimeFrame(getQuery(state))
  let symbols = getSyncSymbols(state)
  if (!symbols.length) {
    symbols = ['USD']
  }
  return {
    syncMode: getSyncMode(state),
    syncSymbols: symbols,
    startTime: getStartTime(state) || new Date(start).getTime(),
  }
}

const mapDispatchToProps = {
  setSyncPref: (symbol, startTime, logout) => editSyncSymbolPref(symbol, startTime.getTime(), logout),
}

const SyncSymbolPrefButtonContainer = connect(mapStateToProps, mapDispatchToProps)(SyncSymbolPrefButton)

export default SyncSymbolPrefButtonContainer
