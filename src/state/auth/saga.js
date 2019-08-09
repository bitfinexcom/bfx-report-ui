import {
  call,
  take,
  all,
  race,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import _get from 'lodash/get'

import WS from 'state/ws'
import wsTypes from 'state/ws/constants'
import { selectAuth } from 'state/auth/selectors'
import { fetchTimezone } from 'state/base/saga'
import { setAuthToken } from 'state/base/actions'
import { getApiKey, getApiSecret } from 'state/base/selectors'
import { getAuth, checkEmail } from 'state/utils'
import { updateErrorStatus, updateSuccessStatus } from 'state/status/actions'
import { fetchSymbols } from 'state/symbols/actions'
import { setOwnerEmail } from 'state/query/actions'
import { platform } from 'var/config'

import types from './constants'
import actions from './actions'

const updateAuthErrorStatus = msg => updateErrorStatus({
  id: 'status.request.error',
  topic: 'auth.auth',
  detail: JSON.stringify(msg),
})

let loginRetryCount = 0

function* fetchEmail() {
  const auth = yield select(selectAuth)
  const { result } = yield call(checkEmail, auth)

  if (result) {
    yield put(setOwnerEmail(result))
  }
}

function* wsLogin() {
  WS.send('login')
  const { wsAuth, timeout } = yield race({
    wsAuth: take(types.WS_LOGIN),
    timeout: delay(300),
  })

  console.log(2, wsAuth, timeout)

  if (timeout) {
    if (loginRetryCount < 8) {
      loginRetryCount += 1
      yield call(wsLogin)
    } else {
      yield put(updateAuthErrorStatus())
      yield put(actions.updateAuthStatus())
    }
  }

  return wsAuth
}

function* checkAuth() {
  try {
    console.log(111111111111111111111)
    const auth = yield select(selectAuth)
    if (!auth) {
      yield put(actions.updateAuthStatus())
      return
    }

    const { result, error } = yield call(getAuth, auth)

    if (result) {
      if (platform.showFrameworkMode) {
        WS.connect()

        const { connectTimeout } = yield race({
          wsConnect: take(wsTypes.WS_CONNECT),
          connectTimeout: delay(3000),
        })

        if (connectTimeout) {
          yield put(updateAuthErrorStatus())
          yield put(actions.updateAuthStatus())
          return
        }

        const wsAuth = yield call(wsLogin)
        loginRetryCount = 0
        if (!wsAuth) {
          return
        }

        const email = _get(wsAuth, ['payload', 'result'])
        if (email) {
          yield put(setOwnerEmail(email))
        }

        yield call(fetchTimezone)
      } else {
        yield all([
          put(fetchSymbols()),
          call(fetchEmail),
          call(fetchTimezone),
        ])
      }

      yield put(updateSuccessStatus({
        id: 'status.success',
        topic: 'auth.auth',
        time: (new Date()).toLocaleString(),
      }))

      yield put(actions.authSuccess(result))
      yield put(actions.hideAuth())

      return
    }

    // if auth was done with authToken and there is apiKey and apiSecret present,
    // clear authToken and try to auth with those instead
    const { authToken } = auth
    if (authToken) {
      const apiKey = yield select(getApiKey)
      const apiSecret = yield select(getApiSecret)

      if (apiKey && apiSecret) {
        yield put(setAuthToken())
        yield call(checkAuth)
        return
      }
    }

    yield put(actions.updateAuthStatus())

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'auth.auth',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

export default function* authSaga() {
  yield takeLatest(types.CHECK_AUTH, checkAuth)
}
