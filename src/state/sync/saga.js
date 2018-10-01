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
import { updateErrorStatus } from 'state/status/actions'

import types from './constants'
import actions from './actions'
import { getSyncMode } from './selectors'

// const checkIsSyncMode = () => makeFetchCall('isSyncMode')
const checkIsSyncModeWithDbData = () => makeFetchCall('isSyncModeWithDbData')
const getSyncProgress = () => makeFetchCall('getSyncProgress')
const isSchedulerEnabled = () => makeFetchCall('isSchedulerEnabled')

const login = auth => makeFetchCall('login', auth)
// const enableSyncMode = auth => makeFetchCall('enableSyncMode', auth)
const enableScheduler = auth => makeFetchCall('enableScheduler', auth)

const disableSyncMode = auth => makeFetchCall('disableSyncMode', auth)
const disableScheduler = auth => makeFetchCall('disableScheduler', auth)
const logout = auth => makeFetchCall('logout', auth)

function updateSyncErrorStatus(msg) {
  return updateErrorStatus({
    id: 'status.fail',
    topic: 'sync.title',
    detail: msg,
  })
}

function* startSyncing() {
  // eslint-disable-next-line
  console.warn('start syncing')
  const auth = yield select(selectAuth)
  const { result, error } = yield call(login, auth)
  if (result) {
    yield delay(300)
    // const { result: syncModeSuccess, error: syncModeError } = yield call(enableSyncMode, auth)
    const { result: syncModeSuccess, error: syncModeError } = yield call(disableSyncMode, auth)
    yield delay(300)
    const { result: schedulerEnabled, error: schedulerError } = yield call(enableScheduler, auth)
    // console.warn('syncMode enabled, schedule disabled', syncModeSuccess, schedulerEnabled)
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
  // eslint-disable-next-line
  console.warn('stop syncing')
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

function* syncWatcher() {
  try {
    while (true) {
      const authState = yield select(getAuthStatus)
      if (authState) {
        // const { result: isSyncMode, error: syncError } = yield call(checkIsSyncMode)
        const { result: isQueryWithDb } = yield call(checkIsSyncModeWithDbData)
        const syncMode = yield select(getSyncMode)
        yield delay(300)
        const { result: progress, error: progressError } = yield call(getSyncProgress)
        // eslint-disable-next-line
        console.warn('queryWithDb, %, %Error', isSyncModeWithDbData, progress, progressError)
        if (isQueryWithDb) {
          if (progress && progress === 100) {
            if (syncMode !== types.MODE_OFFLINE) {
              yield put(actions.setSyncMode(types.MODE_OFFLINE))
            }
          } else if (syncMode !== types.MODE_SYNCING) {
            yield put(actions.startSyncing())
          }
        } else if (progress !== false && progress !== 100) {
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
        } else if (syncMode !== types.MODE_ONLINE) {
          yield put(actions.setSyncMode(types.MODE_ONLINE))
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
  yield takeLatest(queryTypes.UPDATE_AUTH_STATUS, syncWatcher)
}
