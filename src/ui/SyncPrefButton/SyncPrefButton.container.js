import { connect } from 'react-redux'

import queryConstants from 'state/query/constants'
import { editPublicTradesPref, editTickersHistoryPairPref } from 'state/sync/actions'
import {
  getSyncMode,
  getPublicTradesStartTime,
  getPublicTradesPairs,
  getTickersHistoryStartTime,
  getTickersHistoryPairs,
} from 'state/sync/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'

import SyncPrefButton from './SyncPrefButton'

const { MENU_PUBLIC_TRADES } = queryConstants

const mapStateToProps = (state, props) => {
  const { sectionType } = props

  let syncPairs = (sectionType === MENU_PUBLIC_TRADES)
    ? getPublicTradesPairs(state)
    : getTickersHistoryPairs(state)
  if (!syncPairs.length) {
    syncPairs = ['BTC:USD']
  }

  let startTime = (sectionType === MENU_PUBLIC_TRADES)
    ? getPublicTradesStartTime(state)
    : getTickersHistoryStartTime(state)
  if (!startTime) {
    const { start } = getTimeFrame(getQuery(state))
    startTime = new Date(start).getTime()
  }

  return {
    syncMode: getSyncMode(state),
    syncPairs,
    startTime,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { sectionType } = ownProps
  const setSyncPrefFunc = (sectionType === MENU_PUBLIC_TRADES)
    ? editPublicTradesPref
    : editTickersHistoryPairPref

  return {
    setSyncPref: (pair, startTime) => dispatch(setSyncPrefFunc(pair, startTime.getTime())),
  }
}

const SyncPrefButtonContainer = connect(mapStateToProps, mapDispatchToProps)(SyncPrefButton)

export default SyncPrefButtonContainer
