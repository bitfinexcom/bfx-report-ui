import { connect } from 'react-redux'

import { editPublicTradesSymbolPref } from 'state/sync/actions'
import { getStartTime, getSyncMode, getPublicTradesSymbols } from 'state/sync/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'

import SyncSymbolPrefButton from './SyncSymbolPrefButton'

const mapStateToProps = (state = {}) => {
  const { start } = getTimeFrame(getQuery(state))
  let symbols = getPublicTradesSymbols(state)
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
  setSyncPref: (symbol, startTime) => editPublicTradesSymbolPref(symbol, startTime.getTime()),
}

const SyncSymbolPrefButtonContainer = connect(mapStateToProps, mapDispatchToProps)(SyncSymbolPrefButton)

export default SyncSymbolPrefButtonContainer
