import {
  call,
  take,
  race,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import _isEmpty from 'lodash/isEmpty'

import WS from 'state/ws'
import wsTypes from 'state/ws/constants'
import wsSignIn from 'state/ws/signIn'
import { selectAuth } from 'state/auth/selectors'
import { formatAuthDate, makeFetchCall } from 'state/utils'
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

function* onAuthSuccess(result) {
  try {
    yield put(actions.updateAuth(result))
    yield put(fetchSymbols())

    if (platform.showFrameworkMode) {
      if (!WS.isConnected) {
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
      }

      const wsAuth = yield call(wsSignIn)
      if (!wsAuth) {
        yield put(updateAuthErrorStatus())
        yield put(actions.updateAuthStatus())

        return
      }
    } else {
      yield put(setOwnerEmail(result.email))
    }

    yield put(updateSuccessStatus({
      id: 'status.success',
      topic: 'auth.auth',
      time: formatAuthDate(new Date()),
    }))

    yield put(actions.authSuccess(result))
    yield put(actions.hideAuth())
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

function* signUp({ payload }) {
  try {
    const {
      authToken,
      apiKey,
      apiSecret,
      password,
    } = payload

    const authParams = {
      authToken,
      apiKey,
      apiSecret,
      password,
    }

    const method = platform.showFrameworkMode ? 'signUp' : 'verifyUser'
    const { result, error } = yield call(makeFetchCall, method, null, authParams)

    if (result) {
      yield call(onAuthSuccess, { ...payload, ...result })
      return
    }

    yield put(actions.updateAuthStatus())

    if (error) {
      if (authToken) {
        yield put(actions.updateAuth({ authToken: '' }))
      }
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

function* signIn({ payload }) {
  try {
    const {
      email,
      password,
    } = payload

    const authParams = {
      email,
      password,
    }
    const { result, error } = yield call(makeFetchCall, 'signIn', null, authParams)

    if (result) {
      yield call(onAuthSuccess, { ...payload, ...result })
      return
    }

    yield put(actions.updateAuthStatus())

    if (error) {
      if (error.code === 401) {
        yield put(updateErrorStatus({
          id: 'status.credentials',
        }))
        return
      }

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

function* checkAuth() {
  try {
    const auth = yield select(selectAuth)
    if (_isEmpty(auth)) {
      return
    }

    if (platform.showFrameworkMode) {
      yield put(actions.signIn(auth))
      return
    }

    yield put(actions.signUp(auth))
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

export default function* authSaga() {
  yield takeLatest(types.CHECK_AUTH, checkAuth)
  yield takeLatest(types.SIGN_UP, signUp)
  yield takeLatest(types.SIGN_IN, signIn)
}
