import { connect } from 'react-redux'

import queryConstants from 'state/query/constants'
import { editPublicTradesPairPref, editTickersHistoryPairPref } from 'state/sync/actions'
import {
  getStartTime, getSyncMode, getPublicTradesPairs, getTickersHistoryPairs,
} from 'state/sync/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'

import SyncPrefButton from './SyncPrefButton'

const { MENU_PUBLIC_TRADES } = queryConstants

const mapStateToProps = (state = {}, props) => {
  const { sectionType } = props
  const { start } = getTimeFrame(getQuery(state))
  let pairs = (sectionType === MENU_PUBLIC_TRADES)
    ? getPublicTradesPairs(state)
    : getTickersHistoryPairs(state)
  if (!pairs.length) {
    pairs = ['BTC:USD']
  }
  return {
    syncMode: getSyncMode(state),
    syncPairs: pairs,
    startTime: getStartTime(state) || new Date(start).getTime(),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { sectionType } = ownProps
  const setSyncPrefFunc = (sectionType === MENU_PUBLIC_TRADES)
    ? editPublicTradesPairPref
    : editTickersHistoryPairPref

  return {
    setSyncPref: (pair, startTime) => dispatch(setSyncPrefFunc(pair, startTime.getTime())),
  }
}

const SyncPrefButtonContainer = connect(mapStateToProps, mapDispatchToProps)(SyncPrefButton)

export default SyncPrefButtonContainer
