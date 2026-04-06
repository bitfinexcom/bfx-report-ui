import {
  take, race, put, delay,
} from 'redux-saga/effects'

import types from './constants'
import { hideAutoUpdateToast } from './actions'

function* sendCloseEvent(dismiss, toastId) {
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

// Returns the consumed next action if a new template arrived during race,
// so the main loop can handle it immediately without waiting for another take.
function* handleTemplate({ timer, toastId, progress }) {
  // auto close by timer or when progress is already 100
  let effectiveTimer = progress >= 100 ? 1000 : timer

  if (!Number.isInteger(effectiveTimer)) {
    // no timer - wait for user action, next template, or progress 100%
    const { close, next } = yield* waitForCloseOrNext()

    if (close) {
      yield* sendCloseEvent(close.payload, toastId)
      return null
    }
    if (next) {
      // race consumed the next template action, pass it back
      // to the main loop so it's handled immediately
      return next
    }

    // Download complete - give 1s grace period before auto-closing,
    // fall through to the common timer race below
    effectiveTimer = 1000
  }

  // wait for timer, user action, or next template - whichever comes first
  const { timeout, close, next } = yield race({
    timeout: delay(effectiveTimer),
    close: take(types.CLOSE_AUTO_UPDATE_TOAST),
    next: take(types.SET_AUTO_UPDATE_TOAST_TEMPLATE),
  })

  if (timeout) {
    yield* sendCloseEvent(timer ? 'timer' : 'close', toastId)
  } else if (close) {
    yield* sendCloseEvent(close.payload, toastId)
  } else if (next) {
    return next
  }

  return null
}

export default function* autoUpdateToastSaga() {
  let action = yield take(types.SET_AUTO_UPDATE_TOAST_TEMPLATE)

  while (true) {
    const nextAction = yield* handleTemplate(action.payload)

    // If a new template was consumed during race, handle it immediately.
    // Otherwise wait for the next one.
    action = nextAction || (yield take(types.SET_AUTO_UPDATE_TOAST_TEMPLATE))
  }
}
