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
import { setSyncState } from 'state/base/actions'
import { getSyncState } from 'state/base/selectors'
import { selectAuth } from 'state/auth/selectors'
import { getSymbolsFetchStatus } from 'state/symbols/selectors'
import { updateErrorStatus, updateStatus } from 'state/status/actions'
import { fetchSymbols } from 'state/symbols/actions'
import {
  formatInternalSymbol,
  formatRawSymbols,
  isPair,
  isSymbol,
} from 'state/symbols/utils'

import types from './constants'
import actions from './actions'
import {
  getSyncMode, getSyncProgress, getPublicTradesPairs, getPublicTradesSymbols,
} from './selectors'

const checkIsSyncModeWithDbData = auth => makeFetchCall('isSyncModeWithDbData', auth)
const fetchSyncProgress = auth => makeFetchCall('getSyncProgress', auth)
const logout = auth => makeFetchCall('logout', auth)
const enableSyncMode = auth => makeFetchCall('enableSyncMode', auth)
const disableSyncMode = auth => makeFetchCall('disableSyncMode', auth)
const getPublicTradesConf = auth => makeFetchCall('getPublicTradesConf', auth)
const getTickersHistoryConf = auth => makeFetchCall('getTickersHistoryConf', auth)
const editPublicTradesConf = (auth, params) => makeFetchCall('editPublicTradesConf', auth, params)
const editTickersHistoryConf = (auth, params) => makeFetchCall('editTickersHistoryConf', auth, params)
const updateSyncErrorStatus = msg => updateErrorStatus({
  id: 'status.request.error',
  topic: 'sync.title',
  detail: msg,
})

function* startSyncing() {
  const auth = yield select(selectAuth)
  const { result, error } = yield call(enableSyncMode, auth)
  if (result) {
    yield put(actions.setSyncPref({
      syncMode: types.MODE_SYNCING,
      progress: 0,
    }))
    yield put(setSyncState(true))
    yield put(updateStatus({ id: 'sync.start' }))
  }
  if (error) {
    yield put(updateSyncErrorStatus('during enableSyncMode'))
  }
}

function* stopSyncing() {
  yield delay(300)
  const auth = yield select(selectAuth)
  const { result, error } = yield call(disableSyncMode, auth)
  if (result) {
    yield put(actions.setSyncMode(types.MODE_ONLINE))
    yield put(setSyncState(false))
    yield put(updateStatus({ id: 'sync.stop-sync' }))
  }
  if (error) {
    yield put(updateSyncErrorStatus('during disableSyncMode'))
  }
}

export function* isSynced() {
  const auth = yield select(selectAuth)
  const [{ result: isQueryWithDb, error }, { result: syncProgress, error: progressError }] = yield all([
    call(checkIsSyncModeWithDbData, auth),
    call(fetchSyncProgress, auth),
  ])

  const synced = (Number.isInteger(syncProgress) && syncProgress === 100)
    || _includes(syncProgress, 'ServerAvailabilityError')
    || _includes(syncProgress, 'getaddrinfo')
  if (isQueryWithDb && synced) {
    return true
  }
  if (error || progressError) {
    yield put(updateSyncErrorStatus('during isSynced'))
  }
  return false
}

function* forceQueryFromDb() {
  yield put(actions.setSyncMode(types.MODE_OFFLINE))
  yield put(updateStatus({ id: 'sync.go-offline' }))
}

function* syncLogout() {
  yield delay(300)
  const auth = yield select(selectAuth)
  const { result, error } = yield call(logout, auth)
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

function* editPublicTradesPairPref({ payload }) {
  const { pairs, startTime } = payload

  const auth = yield select(selectAuth)
  const symbols = yield select(getPublicTradesSymbols)
  const params = [
    ...pairs.map(symbol => ({
      symbol: formatRawSymbols(symbol),
      start: startTime,
    })),
    ...symbols.map(symbol => ({
      symbol: formatRawSymbols(symbol),
      start: startTime,
    })),
  ]

  const { error } = yield call(editPublicTradesConf, auth, params)
  if (error) {
    yield put(updateSyncErrorStatus('during editPublicTradesPairConf'))
  }
}

function* editPublicTradesSymbolPref({ payload }) {
  const { symbols, startTime } = payload

  const auth = yield select(selectAuth)
  const pairs = yield select(getPublicTradesPairs)
  const params = [
    ...pairs.map(symbol => ({
      symbol: formatRawSymbols(symbol),
      start: startTime,
    })),
    ...symbols.map(symbol => ({
      symbol: formatRawSymbols(symbol),
      start: startTime,
    })),
  ]

  const { error } = yield call(editPublicTradesConf, auth, params)
  if (error) {
    yield put(updateSyncErrorStatus('during editPublicTradesSymbolConf'))
  }
}

function* editTickersHistoryPairPref({ payload }) {
  const { pairs = [], startTime } = payload

  const auth = yield select(selectAuth)
  const params = pairs.map(symbol => ({
    symbol: formatRawSymbols(symbol),
    start: startTime,
  }))

  const { error } = yield call(editTickersHistoryConf, auth, params)
  if (error) {
    yield put(updateSyncErrorStatus('during editTickersHistoryConf'))
  }
}

function* getSyncPref() {
  const auth = yield select(selectAuth)

  const [
    { result: publicTradesPrefResult, error: publicTradesPrefError },
    { result: tickersHistoryPrefResult, error: tickersHistoryPrefError },
  ] = yield all([
    yield call(getPublicTradesConf, auth),
    yield call(getTickersHistoryConf, auth),
  ])

  if (publicTradesPrefResult && publicTradesPrefResult.length > 0) {
    const { start } = publicTradesPrefResult[0]
    const format = data => formatInternalSymbol(data.symbol)
    const publicTradesPairs = publicTradesPrefResult.filter(data => isPair(data.symbol)).map(format)
    const publicTradesSymbols = publicTradesPrefResult.filter(data => isSymbol(data.symbol)).map(format)

    yield put(actions.setSyncPref({
      publicTradesPairs,
      publicTradesSymbols,
      startTime: start,
    }))
  }

  if (tickersHistoryPrefResult && tickersHistoryPrefResult.length > 0) {
    const { start } = tickersHistoryPrefResult[0]
    const format = data => formatInternalSymbol(data.symbol)
    const tickersHistoryPairs = tickersHistoryPrefResult.filter(data => isPair(data.symbol)).map(format)

    yield put(actions.setSyncPref({
      tickersHistoryPairs,
      startTime: start,
    }))
  }

  if (publicTradesPrefError) {
    yield put(updateSyncErrorStatus('during getPublicTradesConf'))
  }
  if (tickersHistoryPrefError) {
    yield put(updateSyncErrorStatus('during getTickersHistoryConf'))
  }
}

function* initSync() {
  const isEnabled = yield select(getSyncState)

  if (isEnabled) {
    const auth = yield select(selectAuth)
    const { result: syncProgress } = yield call(fetchSyncProgress, auth)

    const isSyncing = Number.isInteger(syncProgress) && syncProgress !== 100
    if (isSyncing) {
      yield put(actions.setSyncPref({
        syncMode: types.MODE_SYNCING,
        progress: syncProgress,
      }))
    } else {
      yield call(startSyncing)
    }
  }

  yield put(fetchSymbols())
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

    const areSymbolsFetched = select(getSymbolsFetchStatus)
    if (!areSymbolsFetched) {
      yield put(fetchSymbols()) // if user synced after starting offline while in online mode
    }
  }
}

function* updateSyncStatus() {
  const isEnabled = yield select(getSyncState)
  const syncMode = yield select(getSyncMode)

  if (isEnabled) {
    const auth = yield select(selectAuth)
    const { result: syncProgress, error: progressError } = yield call(fetchSyncProgress, auth)

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
}

export default function* syncSaga() {
  yield takeLatest(types.START_SYNCING, startSyncing)
  yield takeLatest(types.STOP_SYNCING, stopSyncing)
  yield takeLatest(types.FORCE_OFFLINE, forceQueryFromDb)
  yield takeLatest(types.EDIT_PUBLIC_TRADES_PAIRS_PREF, editPublicTradesPairPref)
  yield takeLatest(types.EDIT_PUBLIC_TRADES_SYMBOLS_PREF, editPublicTradesSymbolPref)
  yield takeLatest(types.EDIT_TICKERS_HISTORY_PAIRS_PREF, editTickersHistoryPairPref)
  yield takeLatest(authTypes.AUTH_SUCCESS, initSync)
  yield takeLatest(types.WS_PROGRESS_UPDATE, progressUpdate)
  yield takeLatest(types.WS_REQUESTS_REDIRECT, requestsRedirectUpdate)
  yield takeLatest(types.UPDATE_STATUS, updateSyncStatus)
  yield takeLatest(authTypes.LOGOUT, syncLogout)
}
