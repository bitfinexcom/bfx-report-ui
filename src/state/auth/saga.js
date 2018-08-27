import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { postJsonfetch } from 'state/utils'
import { updateErrorStatus, updateSuccessStatus } from 'state/status/actions'
import { getBase } from 'state/base/selectors'
import { platform } from 'var/config'

import types from './constants'
import { setAuthToken, updateAuthStatus } from './actions'

function getAuth(auth) {
  return postJsonfetch(`${platform.API_URL}/check-auth`, {
    auth,
  })
}

function* checkAuth() {
  try {
    const base = yield select(getBase)
    const data = yield call(getAuth, {
      apiKey: base.apiKey,
      apiSecret: base.apiSecret,
    })
    const { result = false, error } = data
    yield put(updateAuthStatus(result))

    if (result) {
      yield put(updateSuccessStatus({
        id: 'status.success',
        topic: 'auth.auth',
        time: (new Date()).toLocaleString(),
      }))
    }

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'auth.auth',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateErrorStatus({
      id: 'status.request.error',
      topic: 'auth.auth',
      detail: JSON.stringify(fail),
    }))
  }
}

function* checkAuthWithToken({ payload: authToken }) {
  try {
    yield put(setAuthToken(authToken))
    const data = yield call(getAuth, { authToken })
    const { result = false, error } = data
    yield put(updateAuthStatus(result))

    if (result) {
      yield put(updateSuccessStatus({
        id: 'status.success',
        topic: 'auth.auth',
        time: (new Date()).toLocaleString(),
      }))
    }

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'auth.auth',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateErrorStatus({
      id: 'status.request.error',
      topic: 'auth.auth',
      detail: JSON.stringify(fail),
    }))
  }
}

export default function* authSaga() {
  yield takeLatest(types.CHECK_AUTH, checkAuth)
  yield takeLatest(types.CHECK_AUTH_WITH_TOKEN, checkAuthWithToken)
}
