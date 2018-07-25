import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import statusTypes from 'state/status/constants'
import { postJsonfetch } from 'state/utils'
import { platform } from 'var/config'
import types from './constants'

function getAuth(apiKey, apiSecret) {
  return postJsonfetch(`${platform.API_URL}/check-auth`, {
    auth: {
      apiKey,
      apiSecret,
    },
  })
}

function* checkAuth() {
  const base = yield select(state => state.base)
  try {
    const data = yield call(getAuth, base.apiKey, base.apiSecret)
    const result = (data && data.result) || false
    yield put({
      type: types.UPDATE_AUTH_STATUS,
      payload: result,
    })

    yield put({
      type: result ? statusTypes.UPDATE_SUCCESS_STATUS : statusTypes.UPDATE_ERROR_STATUS,
      payload: result ? `Auth Success at ${(new Date()).toLocaleString()}` : 'Auth Fail',
    })

    if (data && data.error) {
      yield put({
        type: statusTypes.UPDATE_ERROR_STATUS,
        payload: `Auth fail ${JSON.stringify(data.error)}`,
      })
    }
  } catch (error) {
    yield put({
      type: statusTypes.UPDATE_ERROR_STATUS,
      payload: `Auth request fail ${JSON.stringify(error)}`,
    })
  }
}

export default function* authSaga() {
  yield takeLatest(types.CHECK_AUTH, checkAuth)
}
