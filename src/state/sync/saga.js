import {
  call,
  all,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import _includes from 'lodash/includes'

import authTypes from 'state/auth/constants'
import { makeFetchCall } from 'state/utils'
import { updateErrorStatus, updateStatus } from 'state/status/actions'
import {
  formatRawSymbols, formatPair, mapRequestSymbols, mapRequestPairs,
  mapSymbol, mapPair, isFundingSymbol, isTradingPair, removePrefix,
} from 'state/symbols/utils'

import types from './constants'
import actions from './actions'
import {
  getSyncMode,
  getSyncProgress,
  getPublicTradesPairs,
  getPublicFundingSymbols,
  getPublicFundingStartTime,
  getPublicTradesStartTime,
} from './selectors'

const fetchSyncProgress = () => makeFetchCall('getSyncProgress')
const logout = () => makeFetchCall('logout')
const enableSyncMode = () => makeFetchCall('enableSyncMode')
const disableSyncMode = () => makeFetchCall('disableSyncMode')
const getPublicTradesConf = () => makeFetchCall('getPublicTradesConf')
const getTickersHistoryConf = () => makeFetchCall('getTickersHistoryConf')
const getStatusMessagesConf = () => makeFetchCall('getStatusMessagesConf')
const getCandlesConf = () => makeFetchCall('getCandlesConf')
const editPublicTradesConf = params => makeFetchCall('editPublicTradesConf', params)
const editTickersHistoryConf = params => makeFetchCall('editTickersHistoryConf', params)
const editStatusMessagesConf = params => makeFetchCall('editStatusMessagesConf', params)
const editCandlesConf = params => makeFetchCall('editCandlesConf', params)
const updateSyncErrorStatus = msg => updateErrorStatus({
  id: 'status.request.error',
  topic: 'sync.title',
  detail: msg,
})

function* startSyncing() {
  const { result, error } = yield call(enableSyncMode)
  if (result) {
    yield put(actions.setSyncPref({
      syncMode: types.MODE_SYNCING,
      progress: 0,
    }))
    yield put(updateStatus({ id: 'sync.start' }))
  }
  if (error) {
    yield put(updateSyncErrorStatus('during enableSyncMode'))
  }
}

function* stopSyncing() {
  yield delay(300)
  const { result, error } = yield call(disableSyncMode)
  if (result) {
    yield put(actions.setSyncMode(types.MODE_ONLINE))
    yield put(updateStatus({ id: 'sync.stop-sync' }))
  }
  if (error) {
    yield put(updateSyncErrorStatus('during disableSyncMode'))
  }
}

export function* isSynced() {
  const syncMode = yield select(getSyncMode)
  const syncProgress = yield select(getSyncProgress)

  return (syncMode === types.MODE_OFFLINE && syncProgress === 100)
}

function* forceQueryFromDb() {
  yield put(actions.setSyncMode(types.MODE_OFFLINE))
  yield put(updateStatus({ id: 'sync.go-offline' }))
}

function* syncLogout() {
  yield delay(300)
  const { result, error } = yield call(logout)
  if (result) {
    const syncMode = yield select(getSyncMode)
    if (syncMode !== types.MODE_ONLINE) {
      yield put(actions.setSyncMode(types.MODE_ONLINE))
      yield put(updateStatus({ id: 'sync.logout' }))
    }
  }
  if (error) {
    yield put(updateSyncErrorStatus('during logout'))
  }
}

function* editPublicTradesPref({ payload }) {
  const { pairs, startTime } = payload

  const symbols = yield select(getPublicFundingSymbols)
  const publicFundingStartTime = yield select(getPublicFundingStartTime)

  // config for 2 sections is merged in one
  const params = [
    // public trades config
    ...mapRequestPairs(pairs).map(pair => ({
      symbol: formatRawSymbols(pair),
      start: startTime,
    })),
    // public funding config
    ...mapRequestSymbols(symbols).map(symbol => ({
      symbol: formatRawSymbols(symbol),
      start: publicFundingStartTime,
    })),
  ]

  const { error } = yield call(editPublicTradesConf, params)
  if (error) {
    yield put(updateSyncErrorStatus('during editPublicTradesPairConf'))
  }
}

function* editPublicFundingPref({ payload }) {
  const { symbols, startTime } = payload

  const pairs = yield select(getPublicTradesPairs)
  const publicTradesStartTime = yield select(getPublicTradesStartTime)

  // config for 2 sections is merged in one
  const params = [
    // public trades config
    ...mapRequestPairs(pairs).map(pair => ({
      symbol: formatRawSymbols(pair),
      start: publicTradesStartTime,
    })),
    // public funding config
    ...mapRequestSymbols(symbols).map(symbol => ({
      symbol: formatRawSymbols(symbol),
      start: startTime,
    })),
  ]

  const { error } = yield call(editPublicTradesConf, params)
  if (error) {
    yield put(updateSyncErrorStatus('during editPublicTradesSymbolConf'))
  }
}

function* editTickersHistoryPref({ payload }) {
  const { pairs = [], startTime } = payload

  const params = mapRequestPairs(pairs).map(pair => ({
    symbol: formatRawSymbols(pair),
    start: startTime,
  }))

  const { error } = yield call(editTickersHistoryConf, params)
  if (error) {
    yield put(updateSyncErrorStatus('during editTickersHistoryConf'))
  }
}

function* editCandlesPref({ payload }) {
  const { pairs, startTime } = payload

  const params = mapRequestPairs(pairs).map(pair => ({
    symbol: formatRawSymbols(pair),
    start: startTime,
  }))

  const { error } = yield call(editCandlesConf, params)
  if (error) {
    yield put(updateSyncErrorStatus('during editCandlesConf'))
  }
}

function* getSyncPref() {
  const [
    { result: publicTradesPrefResult, error: publicTradesPrefError },
    { result: tickersHistoryPrefResult, error: tickersHistoryPrefError },
    { result: statusMessagesPrefResult },
    { result: candlesPrefResult, error: candlesPrefError },
  ] = yield all([
    yield call(getPublicTradesConf),
    yield call(getTickersHistoryConf),
    yield call(getStatusMessagesConf),
    yield call(getCandlesConf),
  ])

  // set default pref for derivatives, enabling view of those pairs in sync mode
  if (!statusMessagesPrefResult.length) {
    yield call(editStatusMessagesConf, [{ symbol: 'tBTCF0:USTF0', start: 0 }, { symbol: 'tETHF0:USTF0', start: 0 }])
  }

  if (!candlesPrefResult.length) {
    yield call(editCandlesConf, [{ symbol: 'tBTCUSD', start: 0 }])
  }

  const formatSymbol = data => mapSymbol(removePrefix(data.symbol))
  const formatConfigPairs = ({ symbol }) => mapPair(formatPair(symbol))

  if (publicTradesPrefResult && publicTradesPrefResult.length) {
    const publicTradesPairs = publicTradesPrefResult.filter(data => isTradingPair(data.symbol))
    const publicTradesSymbols = publicTradesPrefResult.filter(data => isFundingSymbol(data.symbol))

    yield put(actions.setSyncPref({
      publicTrades: {
        pairs: publicTradesPairs.map(formatConfigPairs),
        startTime: publicTradesPairs[0] && publicTradesPairs[0].start,
      },
      publicFunding: {
        symbols: publicTradesSymbols.map(formatSymbol),
        startTime: publicTradesSymbols[0] && publicTradesSymbols[0].start,
      },
    }))
  }

  if (tickersHistoryPrefResult && tickersHistoryPrefResult.length) {
    const tickersHistoryPairs = tickersHistoryPrefResult.filter(data => isTradingPair(data.symbol))

    yield put(actions.setSyncPref({
      tickersHistory: {
        pairs: tickersHistoryPairs.map(formatConfigPairs),
        startTime: tickersHistoryPairs[0] && tickersHistoryPairs[0].start,
      },
    }))
  }

  if (publicTradesPrefError) {
    yield put(updateSyncErrorStatus('during getPublicTradesConf'))
  }
  if (tickersHistoryPrefError) {
    yield put(updateSyncErrorStatus('during getTickersHistoryConf'))
  }
  if (candlesPrefError) {
    yield put(updateSyncErrorStatus('during getCandlesConf'))
  }
}

function* initSync() {
  const { result: syncProgress } = yield call(fetchSyncProgress)

  const isSyncing = Number.isInteger(syncProgress) && syncProgress !== 100
  if (isSyncing) {
    yield put(actions.setSyncPref({
      syncMode: types.MODE_SYNCING,
      progress: syncProgress,
    }))
  } else {
    yield call(startSyncing)
  }

  yield call(getSyncPref)
}

function* progressUpdate({ payload }) {
  const { result } = payload
  const progress = Number.isInteger(result)
    ? result
    : 0

  yield put(actions.setSyncProgress(progress))
}

function* requestsRedirectUpdate({ payload }) {
  const { result } = payload

  if (result) {
    const syncProgress = yield select(getSyncProgress)
    const isSyncing = Number.isInteger(syncProgress) && syncProgress !== 100
    if (isSyncing) {
      yield put(actions.setSyncMode(types.MODE_SYNCING))
    } else {
      yield put(actions.setSyncMode(types.MODE_ONLINE))
    }
  } else {
    yield put(actions.forceQueryFromDb())
  }
}

function* updateSyncStatus() {
  const syncMode = yield select(getSyncMode)
  const { result: syncProgress, error: progressError } = yield call(fetchSyncProgress)

  switch (typeof syncProgress) {
    case 'number':
      if (syncProgress !== 100 && syncMode !== types.MODE_SYNCING) {
        yield put(actions.setSyncMode(types.MODE_SYNCING))
      }
      if (syncProgress === 100 && syncMode !== types.MODE_OFFLINE) {
        yield put(actions.setSyncMode(types.MODE_OFFLINE))
      }
      break
    case 'boolean':
      if (syncMode !== types.MODE_ONLINE) {
        yield put(actions.setSyncMode(types.MODE_ONLINE))
      }
      break
    case 'string':
    default: {
      if (syncProgress === 'SYNCHRONIZATION_HAS_NOT_STARTED_YET'
        || _includes(syncProgress, 'ServerAvailabilityError')) {
        return
      }

      yield put(updateSyncErrorStatus(syncProgress))
      yield put(actions.stopSyncing())
    }
  }

  if (progressError) {
    yield put(updateSyncErrorStatus('during fetchSyncProgress'))
  }
}

export default function* syncSaga() {
  yield takeLatest(types.START_SYNCING, startSyncing)
  yield takeLatest(types.STOP_SYNCING, stopSyncing)
  yield takeLatest(types.FORCE_OFFLINE, forceQueryFromDb)
  yield takeLatest(types.EDIT_PUBLIC_TRADES_PREF, editPublicTradesPref)
  yield takeLatest(types.EDIT_PUBLIC_FUNDING_PREF, editPublicFundingPref)
  yield takeLatest(types.EDIT_TICKERS_HISTORY_PREF, editTickersHistoryPref)
  yield takeLatest(types.EDIT_CANDLES_PREF, editCandlesPref)
  yield takeLatest(authTypes.AUTH_SUCCESS, initSync)
  yield takeLatest(types.WS_PROGRESS_UPDATE, progressUpdate)
  yield takeLatest(types.WS_REQUESTS_REDIRECT, requestsRedirectUpdate)
  yield takeLatest(types.UPDATE_STATUS, updateSyncStatus)
  yield takeLatest(authTypes.LOGOUT, syncLogout)
}
