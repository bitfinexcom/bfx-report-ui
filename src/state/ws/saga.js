import { call, put, takeLatest } from 'redux-saga/effects'

import { updateSyncStatus } from 'state/sync/actions'

import types from './constants'
import login from './login'

function* reconnect() {
  const wsAuth = yield call(login)

  if (wsAuth) {
    yield put(updateSyncStatus())
  }
}

export default function* wsSaga() {
  yield takeLatest(types.WS_RECONNECT, reconnect)
}
