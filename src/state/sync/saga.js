import {
  call,
  cancelled,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { makeFetchCall } from 'state/utils'
import { getAuthStatus, selectAuth } from 'state/auth/selectors'
import queryTypes from 'state/auth/constants'
import { updateErrorStatus, updateStatus } from 'state/status/actions'

import types from './constants'
import actions from './actions'
import { getSyncMode } from './selectors'

// const checkIsSyncMode = () => makeFetchCall('isSyncMode')
const checkIsSyncModeWithDbData = () => makeFetchCall('isSyncModeWithDbData')
const getSyncProgress = () => makeFetchCall('getSyncProgress')
const isSchedulerEnabled = () => makeFetchCall('isSchedulerEnabled')

const login = auth => makeFetchCall('login', auth)
const enableSyncMode = auth => makeFetchCall('enableSyncMode', auth)
const enableScheduler = auth => makeFetchCall('enableScheduler', auth)

const disableSyncMode = auth => makeFetchCall('disableSyncMode', auth)
const disableScheduler = auth => makeFetchCall('disableScheduler', auth)
const logout = auth => makeFetchCall('logout', auth)

function updateSyncErrorStatus(msg) {
  return updateErrorStatus({
    id: 'status.request.error',
    topic: 'sync.title',
    detail: msg,
  })
}

function* startSyncing() {
  yield put(updateStatus({ id: 'sync.start' }))
  const auth = yield select(selectAuth)
  const { result, error } = yield call(login, auth)
  if (result) {
    yield delay(300)
    const { result: syncModeSuccess, error: syncModeError } = yield call(disableSyncMode, auth)
    yield delay(300)
    const { result: schedulerEnabled, error: schedulerError } = yield call(enableScheduler, auth)
    if (schedulerEnabled && syncModeSuccess) {
      yield put(actions.setSyncMode(types.MODE_SYNCING))
    }
    if (schedulerError) {
      yield put(updateSyncErrorStatus('during enableScheduler'))
    }
    if (syncModeError) {
      yield put(updateSyncErrorStatus('during disableSyncMode'))
    }
  }
  if (error) {
    yield put(updateSyncErrorStatus('during login'))
  }
}

function* stopSyncing() {
  yield put(updateStatus({ id: 'sync.stop-sync' }))
  const auth = yield select(selectAuth)
  yield delay(300)
  const { result: schedulerDisabled, error: disSchedulerError } = yield call(disableScheduler, auth)
  yield delay(300)
  const { result: syncModeDisabled, error: syncModeError } = yield call(disableSyncMode, auth)
  if (schedulerDisabled && syncModeDisabled) {
    yield delay(300)
    const { result } = yield call(logout, auth)
    if (result) {
      yield put(actions.setSyncMode(types.MODE_ONLINE))
    }
  }

  if (disSchedulerError) {
    yield put(updateSyncErrorStatus('during disableScheduler'))
  }
  if (syncModeError) {
    yield put(updateSyncErrorStatus('during disableSyncMode'))
  }
}

function* forceQueryFromDb() {
  yield put(updateStatus({ id: 'sync.go-offline' }))
  yield delay(300)
  const auth = yield select(selectAuth)
  const { result, error } = yield call(enableSyncMode, auth)
  if (result) {
    yield put(actions.setSyncMode(types.MODE_OFFLINE))
  }
  if (error) {
    yield put(updateSyncErrorStatus('during enableSyncMode'))
  }
}

function* syncWatcher() {
  try {
    while (true) {
      const authState = yield select(getAuthStatus)
      if (authState) {
        // const { result: isSyncMode, error: syncError } = yield call(checkIsSyncMode)
        const { result: isQueryWithDb } = yield call(checkIsSyncModeWithDbData)
        const syncMode = yield select(getSyncMode)
        yield delay(300)
        const { result: progress } = yield call(getSyncProgress)
        // console.warn('queryWithDb, %', isQueryWithDb, progress)
        if (isQueryWithDb) {
          // when progress 100 => offline mode
          if (progress && progress === 100) {
            if (syncMode !== types.MODE_OFFLINE) {
              yield put(actions.forceQueryFromDb())
            }
          } else if (syncMode !== types.MODE_SYNCING) {
            yield put(actions.startSyncing())
          }
        } else {
          switch (typeof progress) {
            case 'number':
              // when progress 0~99 => syncing mode
              if (progress !== 100) {
                if (syncMode !== types.MODE_SYNCING) {
                  const { result: hasSched, error: schedError } = yield call(isSchedulerEnabled)
                  if (!hasSched) {
                    yield put(actions.startSyncing())
                  } else {
                    yield put(actions.setSyncMode(types.MODE_SYNCING))
                  }

                  if (schedError) {
                    yield put(updateSyncErrorStatus('during check isSchedulerEnabled'))
                  }
                }
              } else { // when progress 100 => offline mode
                yield put(actions.forceQueryFromDb())
              }
              break
            // when progress false => online mode
            case 'boolean':
              if (syncMode !== types.MODE_ONLINE) {
                yield put(actions.setSyncMode(types.MODE_ONLINE))
              }
              break
            // when progress error => show notification and stop syncing
            case 'string':
            default:
              yield put(updateSyncErrorStatus(progress))
              yield put(actions.stopSyncing())
              break
          }
        }
      }
      yield delay(5000) // check every 5s
    }
  } finally {
    if (yield cancelled()) {
      yield put(updateErrorStatus({
        id: 'sync.message.canceled',
      }))
    }
  }
}

export default function* syncSaga() {
  yield takeLatest(types.START_SYNCING, startSyncing)
  yield takeLatest(types.STOP_SYNCING, stopSyncing)
  yield takeLatest(types.FORCE_OFFLINE, forceQueryFromDb)
  yield takeLatest(queryTypes.UPDATE_AUTH_STATUS, syncWatcher)
}
