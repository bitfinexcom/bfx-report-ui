import {
  takeLatest, put, select,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'

import types from './constants'
import { hideAutoUpdateToast } from './actions'
import { selectAutoUpdateToast } from './selectors'

function* sendCloseEvent(dismiss, toastId) {
  window.bfxReportElectronApi?.sendToastClosedEvent({
    toastId,
    dismiss,
  })

  yield put(hideAutoUpdateToast())
}

function* handleTemplate({ payload }) {
  const { toastId: prevToastId } = yield select(selectAutoUpdateToast)

  // close previous toast if exists
  if (prevToastId) {
    window.bfxReportElectronApi?.sendToastClosedEvent({
      toastId: prevToastId,
      dismiss: 'close',
    })
  }

  const { timer, toastId, progress } = payload

  // auto close by timer or when progress is already 100
  const effectiveTimer = progress >= 100 ? 1000 : timer

  if (Number.isInteger(effectiveTimer)) {
    yield delay(effectiveTimer)
    yield* sendCloseEvent(timer ? 'timer' : 'close', toastId)
  }
}

function* handleProgress({ payload }) {
  const progress = payload

  if (progress >= 100) {
    yield delay(1000)
    const { toastId } = yield select(selectAutoUpdateToast)
    yield* sendCloseEvent('close', toastId)
  }
}

function* handleClose({ payload: dismiss }) {
  const { toastId } = yield select(selectAutoUpdateToast)
  yield* sendCloseEvent(dismiss, toastId)
}

export default function* autoUpdateToastSaga() {
  yield takeLatest(types.SET_AUTO_UPDATE_TOAST_TEMPLATE, handleTemplate)
  yield takeLatest(types.SET_AUTO_UPDATE_TOAST_PROGRESS, handleProgress)
  yield takeLatest(types.CLOSE_AUTO_UPDATE_TOAST, handleClose)
}
