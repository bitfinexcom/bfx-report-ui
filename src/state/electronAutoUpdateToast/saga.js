import {
  take, race, put,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'

import types from './constants'
import { hideAutoUpdateToast } from './actions'

function* sendCloseEvent(dismiss, toastId) {
  console.log('==bfxReportElectronApi?.sendToastClosedEvent==', dismiss, toastId)
  window.bfxReportElectronApi?.sendToastClosedEvent({
    toastId,
    dismiss,
  })

  yield put(hideAutoUpdateToast())
}

// Races between user closing the toast, a new template arriving,
// or download progress reaching 100%. Whichever wins cancels the others,
// ensuring stale timers don't fire after the toast is already dismissed.
function* waitForCloseOrNext() {
  return yield race({
    close: take(types.CLOSE_AUTO_UPDATE_TOAST),
    next: take(types.SET_AUTO_UPDATE_TOAST_TEMPLATE),
    progress100: take(
      (action) => action.type === types.SET_AUTO_UPDATE_TOAST_PROGRESS
        && action.payload >= 100,
    ),
  })
}

function* handleTemplate({ timer, toastId, progress }) {
  // auto close by timer or when progress is already 100
  const effectiveTimer = progress >= 100 ? 1000 : timer

  if (!Number.isInteger(effectiveTimer)) {
    // no timer - wait for user action, next template, or progress 100%
    const { close, progress100 } = yield* waitForCloseOrNext()

    if (close) {
      yield* sendCloseEvent(close.payload, toastId)
    } else if (progress100) {
      // Download complete - give 1s grace period before auto-closing.
      // If user clicks a button or a new toast arrives during that
      // second, the timeout is cancelled and their action takes priority.
      const result = yield race({
        timeout: delay(1000),
        close: take(types.CLOSE_AUTO_UPDATE_TOAST),
        next: take(types.SET_AUTO_UPDATE_TOAST_TEMPLATE),
      })

      if (result.timeout) {
        yield* sendCloseEvent('close', toastId)
      } else if (result.close) {
        yield* sendCloseEvent(result.close.payload, toastId)
      }
    }
    return
  }

  // wait for timer, user action, or next template - whichever comes first
  const { timeout, close } = yield race({
    timeout: delay(effectiveTimer),
    close: take(types.CLOSE_AUTO_UPDATE_TOAST),
    next: take(types.SET_AUTO_UPDATE_TOAST_TEMPLATE),
  })

  if (timeout) {
    yield* sendCloseEvent(timer ? 'timer' : 'close', toastId)
  } else if (close) {
    yield* sendCloseEvent(close.payload, toastId)
  }
  // if next - do nothing, handleElectronLoad already sent close for prev toast
}

export default function* autoUpdateToastSaga() {
  while (true) {
    const { payload } = yield take(types.SET_AUTO_UPDATE_TOAST_TEMPLATE)
    yield* handleTemplate(payload)
  }
}
