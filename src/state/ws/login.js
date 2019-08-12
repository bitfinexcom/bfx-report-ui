import { call, take, race } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import _get from 'lodash/get'

import WS from 'state/ws'
import types from 'state/auth/constants'

const RETRIES = 6

function* wsLogin(retryCount = 0) {
  WS.send('login')
  const { wsAuth, timeout } = yield race({
    wsAuth: take(types.WS_LOGIN),
    timeout: delay(retryCount * 200 + 300),
  })

  if (timeout && retryCount < RETRIES) {
    return yield call(wsLogin, retryCount + 1)
  }

  return _get(wsAuth, ['payload', 'result']) // user email
}

export default wsLogin
