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

// Returns the consumed next action if a new template arrived during race,
// so the main loop can handle it immediately without waiting for another take.
function* handleTemplate({ timer, toastId, progress }) {
  // auto close by timer or when progress is already 100
  const effectiveTimer = progress >= 100 ? 1000 : timer

  if (!Number.isInteger(effectiveTimer)) {
    // no timer - wait for user action, next template, or progress 100%
    const { close, next, progress100 } = yield* waitForCloseOrNext()

    if (close) {
      yield* sendCloseEvent(close.payload, toastId)
    } else if (next) {
      // race consumed the next template action, pass it back
      // to the main loop so it's handled immediately
      return next
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
      } else if (result.next) {
        return result.next
      }
    }
    return null
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
  // if next - do nothing, handleElectronLoad already sent close for prev toast
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
