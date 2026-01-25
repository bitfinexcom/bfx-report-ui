import {
  takeLatest, put, select, delay,
} from 'redux-saga/effects'

import types from './constants'
import { hideAutoUpdateToast } from './actions'
import { selectAutoUpdateToast } from './selectors'

function* callClose(dismiss, toastId) {
  window.bfxReportElectronApi?.sendToastClosedEvent({
    toastId,
    dismiss,
  })

  yield put(hideAutoUpdateToast(dismiss))
}

function* handleTemplate({ payload }) {
  const { timer, toastId } = payload

  // auto close by timer
  if (Number.isInteger(timer)) {
    yield delay(timer)
    yield callClose('timer', toastId)
  }
}

function* handleProgress({ payload }) {
  const { progress } = payload

  if (progress >= 100) {
    yield delay(1000)
    const { toastId } = yield select(selectAutoUpdateToast)
    yield callClose('close', toastId)
  }
}

export default function* autoUpdateToastSaga() {
  yield takeLatest(types.SET_AUTO_UPDATE_TOAST_TEMPLATE, handleTemplate)
  yield takeLatest(types.SET_AUTO_UPDATE_TOAST_PROGRESS, handleProgress)
}
