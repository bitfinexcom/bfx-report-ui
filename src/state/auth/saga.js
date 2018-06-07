import { call, put, select, takeLatest } from 'redux-saga/effects'
import types from './constants'
import { postJsonfetch } from '../../utils'

function getAuth(apiKey, apiSecret) {
  return postJsonfetch('http://localhost:31339/check-auth', {
    auth: {
      apiKey,
      apiSecret,
    }
  })
}

function* checkAuth(action = {}) {
  const state = yield select(state => state.auth);
  try {
    const data = yield call(getAuth, state.apiKey, state.apiSecret)
    console.log(data)
    yield put({
      type: types.UPDATE_AUTH_RESULT,
      payload: data && data.result
    })
  } catch (error) {
    console.error(error)
    // yield put({ type: 'REQUEST_FAILED', error })
  }
}

// function* checkAuthWithApiKey(action = {}) {
// }

// function *checkAuthWithAuthKey(action = {}) {

// }

export default function* authSaga() {
    yield takeLatest(types.CHECK_AUTH, checkAuth)
  // yield takeLatest(types.SET_AUTH_KEY, checkAuthWithAuthKey)
}
