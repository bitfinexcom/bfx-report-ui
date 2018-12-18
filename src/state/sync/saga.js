import {
  call,
  cancelled,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { makeFetchCall } from 'state/utils'
import { hideAuth } from 'state/auth/actions'
import authTypes from 'state/auth/constants'
import { getAuthStatus, selectAuth, getIsShown } from 'state/auth/selectors'
import { setTimezone } from 'state/base/actions'
import { getTimezone } from 'state/base/selectors'
import { updateErrorStatus, updateStatus } from 'state/status/actions'
import { formatInternalPair, formatRawSymbols } from 'state/symbols/utils'

import types from './constants'
import actions from './actions'
import { getSyncMode } from './selectors'

const checkIsSyncModeWithDbData = auth => makeFetchCall('isSyncModeWithDbData', auth)
const getSyncProgress = auth => makeFetchCall('getSyncProgress', auth)
const isSchedulerEnabled = () => makeFetchCall('isSchedulerEnabled')
const syncNow = auth => makeFetchCall('syncNow', auth)
const logout = auth => makeFetchCall('logout', auth)
const enableSyncMode = auth => makeFetchCall('enableSyncMode', auth)
const disableSyncMode = auth => makeFetchCall('disableSyncMode', auth)
const getUsersTimeConf = auth => makeFetchCall('getUsersTimeConf', auth)
const getPublicTradesConf = auth => makeFetchCall('getPublicTradesConf', auth)
const editPublicTradesConf = (auth, params) => makeFetchCall('editPublicTradesConf', auth, params)
const updateSyncErrorStatus = msg => updateErrorStatus({
  id: 'status.request.error',
  topic: 'sync.title',
  detail: msg,
})

function* startSyncing() {
  yield delay(300)
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
  const { pairs, startTime } = payload

  const auth = yield select(selectAuth)
  const params = (pairs.length === 1)
    ? {
      symbol: formatRawSymbols(pairs[0]),
      start: startTime,
    }
    : pairs.map(symbol => ({
      symbol: formatRawSymbols(symbol),
      start: startTime,
    }))
  const { error } = yield call(editPublicTradesConf, auth, params)
  if (error) {
    yield put(updateSyncErrorStatus('during editPublicTradesConf'))
  }
}

function* syncWatcher() {
  try {
    while (true) {
      const authState = yield select(getAuthStatus)
      const isShownAuth = yield select(getIsShown)
      const auth = yield select(selectAuth)
      if (authState && isShownAuth) {
        const { result, error } = yield call(syncNow, auth)
        if (result) {
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
            yield put(actions.setSyncPref(
              syncPrefResult.map(data => formatInternalPair(data.symbol)),
              syncPrefResult[0].start,
            ))
          }
          if (syncPrefError) {
            yield put(updateSyncErrorStatus('during editPublicTradesConf'))
          }

          yield put(hideAuth())
        }
        if (error) {
          yield put(updateSyncErrorStatus('during syncNow'))
        }
      }
      if (authState && !isShownAuth) {
        const { result: isQueryWithDb } = yield call(checkIsSyncModeWithDbData, auth)
        // get current ui state
        const syncMode = yield select(getSyncMode)
        yield delay(300)
        const { result: progress } = yield call(getSyncProgress, auth)
        // console.warn('queryWithDb, %', isQueryWithDb, progress)
        if (isQueryWithDb) {
          if (progress) {
            // go offline when progress return result
            // "Error: The server https://{url} is not available", which means no internet connection
            if (typeof progress === 'string' && progress.startsWith('Error: The server')) {
              yield put(actions.setSyncMode(types.MODE_OFFLINE))
            // go offline with notification when progress 100
            } else if ((progress === 100 && syncMode !== types.MODE_OFFLINE)) {
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
              }
              break
            // when progress false => online mode
            case 'boolean':
              if (syncMode !== types.MODE_ONLINE) {
                yield put(actions.setSyncMode(types.MODE_ONLINE))
              }
              break
            // when progress error after the main page is shown => show notification and stop syncing
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
  yield takeLatest(types.SET_PREF, editSyncPref)
  yield takeLatest(authTypes.UPDATE_AUTH_STATUS, syncWatcher)
  yield takeLatest(authTypes.LOGOUT, syncLogout)
}
