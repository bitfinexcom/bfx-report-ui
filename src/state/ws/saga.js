import { call, put, takeLatest } from 'redux-saga/effects'

import { updateSyncStatus } from 'state/sync/actions'
import { updateStatus, updateWarningStatus } from 'state/status/actions'

import types from './constants'
import login from './signIn'

function* reconnect() {
  const wsAuth = yield call(login)

  if (wsAuth) {
    yield put(updateSyncStatus())
  }
}

function* notifyNetError() {
  yield put(updateWarningStatus({ id: 'status.netError' }))
}

function* notifyNetResumed() {
  yield put(updateStatus({ id: 'status.netResumed' }))
}

export default function* wsSaga() {
  yield takeLatest(types.WS_RECONNECT, reconnect)
  yield takeLatest(types.WS_NET_ERROR, notifyNetError)
  yield takeLatest(types.WS_NET_RESUMED, notifyNetResumed)
}
