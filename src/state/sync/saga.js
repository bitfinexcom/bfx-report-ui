import {
  call,
  all,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { makeFetchCall } from 'state/utils'
import { logout as logoutAction } from 'state/auth/actions'
import authTypes from 'state/auth/constants'
import { selectAuth } from 'state/auth/selectors'
import { setTimezone } from 'state/base/actions'
import { getTimezone } from 'state/base/selectors'
import { updateErrorStatus, updateStatus } from 'state/status/actions'
import {
  formatInternalSymbol,
  formatRawSymbols,
  isPair,
  isSymbol,
} from 'state/symbols/utils'

import types from './constants'
import actions from './actions'
import { getSyncSymbols, getSyncPairs } from './selectors'

const checkIsSyncModeWithDbData = auth => makeFetchCall('isSyncModeWithDbData', auth)
const getSyncProgress = auth => makeFetchCall('getSyncProgress', auth)
// const isSchedulerEnabled = () => makeFetchCall('isSchedulerEnabled')
const syncNow = auth => makeFetchCall('syncNow', auth)
const logout = auth => makeFetchCall('logout', auth)
const enableSyncMode = auth => makeFetchCall('enableSyncMode', auth)
const disableSyncMode = auth => makeFetchCall('disableSyncMode', auth)
const getUsersTimeConf = auth => makeFetchCall('getUsersTimeConf', auth)
const getPublicTradesConf = auth => makeFetchCall('getPublicTradesConf', auth)
const editPublicTradesConf = (auth, params) => makeFetchCall('editPublicTradesConf', auth, params)
// const getTickersHistoryConf = auth => makeFetchCall('getTickersHistoryConf', auth)
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
    yield put(actions.setSyncMode(types.MODE_SYNCING))
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
    yield put(updateStatus({ id: 'sync.stop-sync' }))
  }
  if (error) {
    yield put(updateSyncErrorStatus('during disableSyncMode'))
  }
}

export function* isSynched() {
  const auth = yield select(selectAuth)
  const [{ result: isQueryWithDb, error }, { result: syncProgress, error: progressError }] = yield all([
    call(checkIsSyncModeWithDbData, auth),
    call(getSyncProgress, auth),
  ])
  if (isQueryWithDb && Number.isInteger(syncProgress) && syncProgress === 100) {
    return true
  }
  if (error || progressError) {
    yield put(updateSyncErrorStatus('during isSynched'))
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

function* initSync() {
  const auth = yield select(selectAuth)

  const { result, error } = yield call(syncNow, auth)
  if (result) {
    yield put(actions.setSyncMode(types.MODE_SYNCING))
    // get default timezone
    const currentTimezone = yield select(getTimezone)
    if (!currentTimezone) {
      yield delay(300)
      const { result: tz, error: tzError } = yield call(getUsersTimeConf, auth)
      if (tz) {
        yield put(setTimezone(tz.timezoneName))
      }

      if (tzError) {
        yield put(updateSyncErrorStatus(JSON.stringify(tzError)))
      }
    }

    // get syncPref
    const { result: syncPrefResult, error: syncPrefError } = yield call(getPublicTradesConf, auth)
    if (syncPrefResult && syncPrefResult.length > 0) {
      const format = data => formatInternalSymbol(data.symbol)
      const pairs = syncPrefResult.filter(data => isPair(data.symbol))
      const symbols = syncPrefResult.filter(data => isSymbol(data.symbol))
      if (pairs.length > 0) {
        yield put(actions.setSyncPref(
          pairs.map(data => format(data)),
          syncPrefResult[0].start,
        ))
      }
      if (symbols.length > 0) {
        yield put(actions.setSyncSymbolPref(
          symbols.map(data => format(data)),
          syncPrefResult[0].start,
        ))
      }
    }
    if (syncPrefError) {
      yield put(updateSyncErrorStatus('during editPublicTradesConf'))
    }
  }
  if (error) {
    yield put(updateSyncErrorStatus('during syncNow'))
  }
}

function* syncProgressUpdate() {
  //
}

function* syncRequestsRedirectUpdate({ payload }) {
  const { result } = payload
  yield delay(300)

  if (!result) {
    yield put(actions.forceQueryFromDb())
  }
}

export default function* syncSaga() {
  yield takeLatest(types.START_SYNCING, startSyncing)
  yield takeLatest(types.STOP_SYNCING, stopSyncing)
  yield takeLatest(types.FORCE_OFFLINE, forceQueryFromDb)
  yield takeLatest(types.SET_PREF, editSyncPref)
  yield takeLatest(types.SET_SYMBOL_PREF, editSyncSymbolPref)
  yield takeLatest(authTypes.UPDATE_AUTH_STATUS, initSync)
  yield takeLatest(types.SYNC_PROGRESS, syncProgressUpdate)
  yield takeLatest(types.SYNC_REQUESTS_REDIRECT, syncRequestsRedirectUpdate)
  yield takeLatest(authTypes.LOGOUT, syncLogout)
}
