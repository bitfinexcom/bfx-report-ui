import { connect } from 'react-redux'

import { editPublicTradesSymbolPref } from 'state/sync/actions'
import {
  getSyncMode, getPublicFundingStartTime, getPublicFundingSymbols,
} from 'state/sync/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'

import SyncSymbolPrefButton from './SyncSymbolPrefButton'

const mapStateToProps = (state = {}) => {
  let syncSymbols = getPublicFundingSymbols(state)
  if (!syncSymbols.length) {
    syncSymbols = ['USD']
  }

  let startTime = getPublicFundingStartTime(state)
  if (!startTime) {
    const { start } = getTimeFrame(getQuery(state))
    startTime = new Date(start).getTime()
  }

  return {
    syncMode: getSyncMode(state),
    syncSymbols,
    startTime,
  }
}

const mapDispatchToProps = {
  setSyncPref: (symbol, startTime) => editPublicTradesSymbolPref(symbol, startTime.getTime()),
}

const SyncSymbolPrefButtonContainer = connect(mapStateToProps, mapDispatchToProps)(SyncSymbolPrefButton)

export default SyncSymbolPrefButtonContainer
