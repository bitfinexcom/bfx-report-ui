import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { setAuthToken } from 'state/base/actions'
import { selectAuth } from 'state/auth/selectors'
import { getAuthToken } from 'state/base/selectors'
import { getAuth } from 'state/utils'
import { updateErrorStatus, updateSuccessStatus } from 'state/status/actions'

import types from './constants'
import actions from './actions'

const LOCAL_AUTHTOKEN = 'local'

function* checkAuth({ payload: flag }) {
  try {
    const auth = yield select(selectAuth)
    const data = yield call(getAuth, auth)
    const { result = false, error } = data
    yield put(actions.updateAuthStatus(result))

    if (result) {
      yield put(updateSuccessStatus({
        id: 'status.success',
        topic: 'auth.auth',
        time: (new Date()).toLocaleString(),
      }))
    }

    if (result === false && flag === LOCAL_AUTHTOKEN) {
      yield put(actions.logout())
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
    yield put(actions.checkAuth())
  } catch (fail) {
    yield put(updateErrorStatus({
      id: 'status.request.error',
      topic: 'auth.auth',
      detail: JSON.stringify(fail),
    }))
  }
}

function* checkAuthWithLocalToken() {
  try {
    const authToken = yield select(getAuthToken)
    if (authToken) {
      yield put(actions.checkAuth(LOCAL_AUTHTOKEN))
    } else {
      yield put(updateErrorStatus({ id: 'auth.notoken' }))
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
  yield takeLatest(types.CHECK_AUTH_WITH_LOCAL_TOKEN, checkAuthWithLocalToken)
}
