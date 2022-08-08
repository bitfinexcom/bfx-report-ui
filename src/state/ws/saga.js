import { call, put, takeLatest } from 'redux-saga/effects'

import { updateSyncStatus } from 'state/sync/actions'
import { updateWarningStatus } from 'state/status/actions'

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

export default function* wsSaga() {
  yield takeLatest(types.WS_RECONNECT, reconnect)
  yield takeLatest(types.WS_NET_ERROR, notifyNetError)
}
