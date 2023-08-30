import { call, put, takeLatest } from 'redux-saga/effects'

import { initSync } from 'state/sync/saga'
import { authExpired } from 'state/auth/actions'
import { updateSyncStatus } from 'state/sync/actions'
import { setIsCsvExporting } from 'state/query/actions'
import { updateStatus, updateWarningStatus } from 'state/status/actions'
import { toggleExportDialog, toggleExportSuccessDialog } from 'state/ui/actions'

import types from './constants'
import login from './signIn'

function* reconnect() {
  const wsAuth = yield call(login)
  if (wsAuth) {
    yield call(initSync)
    yield put(updateSyncStatus())
  }
}

function* notifyNetError() {
  yield put(updateWarningStatus({ id: 'status.netError' }))
}

function* notifyNetResumed() {
  yield put(updateStatus({ id: 'status.netResumed' }))
}

function* handleTokenAuthRequired() {
  yield put(authExpired())
}

function* handleCsvGenerationCompleted() {
  yield put(setIsCsvExporting(false))
  yield put(toggleExportDialog())
  yield put(toggleExportSuccessDialog())
}

export default function* wsSaga() {
  yield takeLatest(types.WS_RECONNECT, reconnect)
  yield takeLatest(types.WS_NET_ERROR, notifyNetError)
  yield takeLatest(types.WS_NET_RESUMED, notifyNetResumed)
  yield takeLatest(types.WS_BFX_TOKEN_AUTH_REQUIRED, handleTokenAuthRequired)
  yield takeLatest(types.WS_CSV_GENERATION_COMPLETED, handleCsvGenerationCompleted)
}
