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

const login = auth => makeFetchCall('login', auth)
const enableSyncMode = auth => makeFetchCall('enableSyncMode', auth)
const enableScheduler = auth => makeFetchCall('enableScheduler', auth)

const disableSyncMode = auth => makeFetchCall('disableSyncMode', auth)
const disableScheduler = auth => makeFetchCall('disableScheduler', auth)
const logout = auth => makeFetchCall('logout', auth)

function* startSyncing() {
  const auth = yield select(selectAuth)
  const { result, error } = yield call(login, auth)
  console.warn(result, error)
  if (result) {
    yield delay(300)
    // const { result: syncModeEnabled } = yield call(enableSyncMode, auth)
    const { result: schedulerEnabled, error: schedulerError } = yield call(enableScheduler, auth)
    if (schedulerEnabled) {
      console.warn('syncing enabled')
      yield put(actions.setSyncMode(types.MODE_SYNCING))
    }
    if (schedulerError) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'sync.title',
        detail: 'during enableScheduler',
      }))
    }
  }
  if (error) {
    yield put(updateErrorStatus({
      id: 'status.fail',
      topic: 'sync.title',
      detail: 'during login',
    }))
  }
}

function* stopSyncing() {
  const auth = yield select(selectAuth)
  const { result: schedulerDisabled, error: disSchedulerError } = yield call(disableScheduler, auth)
  yield delay(300)
  const { result: syncModeDisabled, error: syncModeError } = yield call(disableSyncMode, auth)
  if (schedulerDisabled && syncModeDisabled) {
    yield delay(300)
    const { result } = yield call(logout, auth)
    console.warn(result)
    if (result) {
      console.warn('syncing disabled, switch to online mode')
      yield put(actions.setSyncMode(types.MODE_ONLINE))
    }
  }

  if (disSchedulerError) {
    yield put(updateErrorStatus({
      id: 'status.fail',
      topic: 'sync.title',
      detail: 'during disableScheduler',
    }))
  }
  if (syncModeError) {
    yield put(updateErrorStatus({
      id: 'status.fail',
      topic: 'sync.title',
      detail: 'during disableSyncMode',
    }))
  }
}

function* syncWatcher(seconds) {
  try {
    while (true) {
      const authState = yield select(getAuthStatus)
      if (authState) {
        // const { result: isSyncMode, error: syncError } = yield call(checkIsSyncMode)
        const { result: isSyncModeWithDbData } = yield call(checkIsSyncModeWithDbData)
        const syncMode = yield select(getSyncMode)
        console.warn('isSyncModeWithDbData', isSyncModeWithDbData)
        if (isSyncModeWithDbData) {
          yield delay(200)
          const { result: progress } = yield call(getSyncProgress)
          console.warn('progress', progress)
          if (progress && progress === 100) {
            if (syncMode !== types.MODE_OFFLINE) {
              yield put(actions.setSyncMode(types.MODE_OFFLINE))
            }
          } else if (syncMode !== types.MODE_SYNCING) {
            console.warn('try login')
            const auth = yield select(selectAuth)
            const { result, error } = yield call(login, auth)
            if (result) {
              console.warn('login stat', result, error)
              yield delay(300)
              const { result: syncModeEnabled, error: syncModeError } = yield call(enableSyncMode, auth)
              console.warn('enable syncMode', syncModeEnabled, syncModeError)
              yield delay(300)
              const { result: schedulerEnabled, error: schedulerError } = yield call(enableScheduler, auth)
              console.warn('enable scheduler', schedulerEnabled, schedulerError)
              if (schedulerEnabled) {
                console.warn('syncing enabled')
                yield put(actions.setSyncMode(types.MODE_SYNCING))
              }
              if (schedulerError) {
                yield put(updateErrorStatus({
                  id: 'status.fail',
                  topic: 'sync.title',
                  detail: 'during enableScheduler',
                }))
              }
            }
            if (error) {
              yield put(updateErrorStatus({
                id: 'status.fail',
                topic: 'sync.title',
                detail: 'during login',
              }))
            }
          }
        } else {
          console.warn('online mode', syncMode)
          if (syncMode !== types.MODE_ONLINE) {
            console.warn('switch to online mode')
            yield put(actions.setSyncMode(types.MODE_ONLINE))
          }
        }
      }
      yield delay(5000)
      console.log('countdown: 5s')
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

  // const monitor = yield call(syncMonitor)
  // setInterval, () => {}, interval
  // const interval = 5
  // const channel = yield call(countdown, interval)
  // yield takeEvery(channel, syncMonitor)
  // try {
  //   while (true) {
  // take(END) will cause the saga to terminate by jumping to the finally block
  // let seconds = yield take(channel)
  // console.log(`countdown: ${seconds}`)

  // if (seconds === 0) {

  //   }
  // } finally {
  //   console.log('countdown terminated')
  // }
}
