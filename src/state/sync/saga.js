import {
  call,
  all,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import _includes from 'lodash/includes'

import { makeFetchCall } from 'state/utils'
import { logout as logoutAction } from 'state/auth/actions'
import authTypes from 'state/auth/constants'
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
import { getSyncMode, getSyncSymbols, getSyncPairs } from './selectors'

const checkIsSyncModeWithDbData = auth => makeFetchCall('isSyncModeWithDbData', auth)
const getSyncProgress = auth => makeFetchCall('getSyncProgress', auth)
const logout = auth => makeFetchCall('logout', auth)
const enableSyncMode = auth => makeFetchCall('enableSyncMode', auth)
const disableSyncMode = auth => makeFetchCall('disableSyncMode', auth)
const getPublicTradesConf = auth => makeFetchCall('getPublicTradesConf', auth)
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
    call(getSyncProgress, auth),
  ])

  const synced = (Number.isInteger(syncProgress) && syncProgress === 100)
    || _includes(syncProgress, 'ServerAvailabilityError')
    || _includes(syncProgress, 'getaddrinfo ENOTFOUND')
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
    yield put(actions.setSyncMode(types.MODE_ONLINE))
    yield put(updateStatus({ id: 'sync.logout' }))
  }
  if (error) {
    yield put(updateSyncErrorStatus('during logout'))
  }
}

function* editSyncPref({ payload }) {
  const { pairs, startTime, logout: logoutFlag } = payload

  const auth = yield select(selectAuth)
  const symbols = yield select(getSyncSymbols)
  const params = (pairs.length === 1)
    ? {
      symbol: formatRawSymbols(pairs[0]),
      start: startTime,
    }
    : [
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
    yield put(updateSyncErrorStatus('during editPublicTradesConf'))
  }
  const { error: tickersConfError } = yield call(editTickersHistoryConf, auth, params)
  if (tickersConfError) {
    yield put(updateSyncErrorStatus('during editTickersHistoryConf'))
  }
  if (logoutFlag) {
    yield put(logoutAction())
  }
}

function* editSyncSymbolPref({ payload }) {
  const { symbols, startTime, logout: logoutFlag } = payload

  const auth = yield select(selectAuth)
  const pairs = yield select(getSyncPairs)
  const params = (symbols.length === 1)
    ? {
      symbol: formatRawSymbols(symbols[0]),
      start: startTime,
    }
    : [
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
    yield put(updateSyncErrorStatus('during editPublicTradesConf'))
  }
  if (logoutFlag) {
    yield put(logoutAction())
  }
}

function* getSyncPref() {
  const auth = yield select(selectAuth)

  const { result: syncPrefResult, error: syncPrefError } = yield call(getPublicTradesConf, auth)
  if (syncPrefResult && syncPrefResult.length > 0) {
    const { start } = syncPrefResult[0]
    const format = data => formatInternalSymbol(data.symbol)
    const pairs = syncPrefResult.filter(data => isPair(data.symbol)).map(format)
    const symbols = syncPrefResult.filter(data => isSymbol(data.symbol)).map(format)

    yield put(actions.setSyncPairPref(pairs, start))
    yield put(actions.setSyncSymbolPref(symbols, start))
  }
  if (syncPrefError) {
    yield put(updateSyncErrorStatus('during getPublicTradesConf'))
  }
}

function* initSync() {
  const isEnabled = yield select(getSyncState)

  if (isEnabled) {
    const auth = yield select(selectAuth)
    const { result: syncProgress } = yield call(getSyncProgress, auth)

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
  yield delay(300)

  if (!result) {
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
    const { result: syncProgress, error: progressError } = yield call(getSyncProgress, auth)

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
      yield put(updateSyncErrorStatus('during getSyncProgress'))
    }
  }
}

export default function* syncSaga() {
  yield takeLatest(types.START_SYNCING, startSyncing)
  yield takeLatest(types.STOP_SYNCING, stopSyncing)
  yield takeLatest(types.FORCE_OFFLINE, forceQueryFromDb)
  yield takeLatest(types.EDIT_PAIR_PREF, editSyncPref)
  yield takeLatest(types.EDIT_SYMBOL_PREF, editSyncSymbolPref)
  yield takeLatest(authTypes.AUTH_SUCCESS, initSync)
  yield takeLatest(types.WS_PROGRESS_UPDATE, progressUpdate)
  yield takeLatest(types.WS_REQUESTS_REDIRECT, requestsRedirectUpdate)
  yield takeLatest(types.UPDATE_STATUS, updateSyncStatus)
  yield takeLatest(authTypes.LOGOUT, syncLogout)
}
