import {
  call,
  put,
  take,
  race,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'

import WS from 'state/ws'
import types from 'state/auth/constants'
import actions from 'state/auth/actions'

const RETRIES = 6

// should signIn before starting ws communication, even if already got token
function* wsSignIn(retryCount = 0) {
  WS.signIn()
  const { wsAuth, timeout } = yield race({
    wsAuth: take(types.WS_SIGN_IN),
    timeout: delay(retryCount * 200 + 500),
  })

  if (timeout && retryCount < RETRIES) {
    return yield call(wsSignIn, retryCount + 1)
  }

  if (wsAuth) {
    const { payload: { result } } = wsAuth
    yield put(actions.updateAuth(result))
  }

  return !!wsAuth
}

export default wsSignIn
