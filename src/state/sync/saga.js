import {
  call,
  fork,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import _isEmpty from 'lodash/isEmpty'
import _includes from 'lodash/includes'

import authTypes from 'state/auth/constants'
import { makeFetchCall } from 'state/utils'
import { selectAuth } from 'state/auth/selectors'
import { updateErrorStatus, updateStatus } from 'state/status/actions'

import types from './constants'
import actions from './actions'
import {
  getSyncMode,
  getIsSyncing,
  getSyncProgress,
} from './selectors'
import syncConfigSaga, { getSyncConf } from './saga.config'

const fetchSyncProgress = () => makeFetchCall('getSyncProgress')
const logout = () => makeFetchCall('signOut')
const isSyncModeWithDbData = () => makeFetchCall('isSyncModeWithDbData')
const enableSyncMode = (params) => makeFetchCall('enableSyncMode', params)
const disableSyncMode = () => makeFetchCall('disableSyncMode')
const haveCollsBeenSyncedAtLeastOnce = () => makeFetchCall('haveCollsBeenSyncedAtLeastOnce')
const syncNow = () => makeFetchCall('syncNow')
const syncNowStop = () => makeFetchCall('stopSyncNow')
const updateSyncErrorStatus = msg => updateErrorStatus({
  id: 'status.request.error',
  topic: 'sync.title',
  detail: msg,
})

function* startSyncing() {
  const { result: isNotSyncRequired } = yield call(haveCollsBeenSyncedAtLeastOnce)
  const { result, error } = yield call(enableSyncMode, { isNotSyncRequired })

  if (result && !isNotSyncRequired) {
    yield put(actions.setSyncPref({
      progress: 0,
      isSyncing: true,
    }))
    yield put(updateStatus({ id: 'sync.start' }))
  }
  if (error) {
    yield put(updateSyncErrorStatus('during enableSyncMode'))
  }
}

function* startSyncNow() {
  const { result, error } = yield call(syncNow)
  if (result) {
    yield put(updateStatus({ id: 'sync.start-sync' }))
    yield put(actions.setIsSyncing(true))
  }
  if (error) {
    yield put(updateSyncErrorStatus('during startSyncNow'))
  }
}

function* stopSyncNow() {
  const { result, error } = yield call(syncNowStop)
  if (result) {
    yield put(actions.setIsSyncing(false))
    yield put(updateStatus({ id: 'sync.logout' }))
  }
  if (error) {
    yield put(updateSyncErrorStatus('during stopSyncNow'))
  }
}

function* stopSyncing() {
  yield delay(300)
  const { result, error } = yield call(disableSyncMode)
  if (result) {
    yield put(actions.setIsSyncing(false))
    yield put(updateStatus({ id: 'sync.stop-sync' }))
  }
  if (error) {
    yield put(updateSyncErrorStatus('during disableSyncMode'))
  }
}

export function* isSynced() {
  const syncProgress = yield select(getSyncProgress)

  return (syncProgress === 100)
}

function* switchSyncMode({ mode }) {
  if (mode !== types.MODE_OFFLINE) {
    const { result, error } = yield call(enableSyncMode, { isNotSyncRequired: true })
    if (result) {
      yield put(actions.setSyncMode(types.MODE_OFFLINE))
      yield put(updateStatus({ id: 'sync.go-offline' }))
    }
    if (error) {
      yield put(updateSyncErrorStatus('during enableSyncMode'))
    }
  } else {
    const { result, error } = yield call(disableSyncMode)
    if (result) {
      yield put(actions.setSyncMode(types.MODE_ONLINE))
      yield put(updateStatus({ id: 'sync.go-online' }))
    }
    if (error) {
      yield put(updateSyncErrorStatus('during disableSyncMode'))
    }
  }
}

function* forceQueryFromDb() {
  const syncProgress = yield select(getSyncProgress)
  if (syncProgress === 100) {
    yield put(updateStatus({ id: 'sync.sync-done' }))
  }
  yield put(actions.setIsSyncing(false))
}

function* syncLogout() {
  yield delay(300)
  const isLoggedIn = !_isEmpty(yield select(selectAuth))
  if (isLoggedIn) {
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
}

function* initQueryMode() {
  const { result, error } = yield call(isSyncModeWithDbData)

  if (result) {
    yield put(actions.setSyncMode(types.MODE_OFFLINE))
  } else {
    yield put(actions.setSyncMode(types.MODE_ONLINE))
  }
  if (error) {
    yield put(updateSyncErrorStatus('during initQueryMode'))
  }
}

export function* initSync() {
  yield call(initQueryMode)
  const { result: syncProgress } = yield call(fetchSyncProgress)
  if (syncProgress === types.SYNC_NOT_STARTED) {
    yield put(actions.setIsSyncing(false))
  } else {
    yield put(actions.setIsSyncing(true))
    const isSyncing = Number.isInteger(syncProgress) && syncProgress !== 100
    if (isSyncing) {
      yield put(actions.setSyncPref({
        progress: syncProgress,
        isSyncing: true,
      }))
    } else {
      yield call(startSyncing)
    }
    yield call(getSyncConf)
  }
}

function* progressUpdate({ payload }) {
  const { result } = payload
  if (result === types.SYNC_INTERRUPTED) {
    yield put(actions.setIsSyncing(false))
  } else {
    const progress = Number.isInteger(result)
      ? result
      : 0
    yield put(actions.setSyncProgress(progress))
  }
}

function* requestsRedirectUpdate({ payload }) {
  const { result } = payload

  if (result) {
    yield put(actions.setSyncMode(types.MODE_ONLINE))
    const syncProgress = yield select(getSyncProgress)
    const isSyncing = Number.isInteger(syncProgress) && syncProgress !== 100
    if (isSyncing) {
      yield put(actions.setIsSyncing(true))
    } else {
      yield put(actions.setIsSyncing(false))
      yield put(updateStatus({ id: 'sync.sync-done' }))
    }
  } else {
    yield put(actions.setSyncMode(types.MODE_OFFLINE))
    yield put(actions.forceQueryFromDb())
  }
}

function* updateSyncStatus() {
  const syncMode = yield select(getSyncMode)
  const isSyncing = yield select(getIsSyncing)
  const { result: syncProgress, error: progressError } = yield call(fetchSyncProgress)

  switch (typeof syncProgress) {
    case 'number':
      if (!isSyncing && syncProgress !== 100) {
        yield put(actions.setIsSyncing(true))
      }
      if (syncProgress === 100) {
        yield put(actions.setIsSyncing(false))
        yield put(updateStatus({ id: 'sync.sync-done' }))
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
  yield takeLatest(types.START_SYNC_NOW, startSyncNow)
  yield takeLatest(types.STOP_SYNC_NOW, stopSyncNow)
  yield takeLatest(types.SWITCH_SYNC_MODE, switchSyncMode)
  yield takeLatest(types.FORCE_OFFLINE, forceQueryFromDb)
  yield takeLatest(authTypes.AUTH_SUCCESS, initSync)
  yield takeLatest(types.WS_PROGRESS_UPDATE, progressUpdate)
  yield takeLatest(types.WS_REQUESTS_REDIRECT, requestsRedirectUpdate)
  yield takeLatest(types.UPDATE_STATUS, updateSyncStatus)
  yield takeLatest(authTypes.LOGOUT, syncLogout)
  yield fork(syncConfigSaga)
}
