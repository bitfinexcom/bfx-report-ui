import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { dispatchAction, makeFetchCall } from 'state/utils'
import { updateAuth } from 'state/auth/actions'
import { updateErrorStatus } from 'state/status/actions'
import { getAuthData } from 'state/auth/selectors'

import types from './constants'
import actions from './actions'

const REFRESH_INTERVAL = 5 * 60 * 1000
let interval = null

export function* refreshToken() {
  try {
    const { authToken } = yield select(getAuthData)
    if (!authToken) {
      return
    }
    const { result } = yield call(makeFetchCall, 'generateToken')

    if (result && result[0]) {
      yield put(updateAuth({ authToken: result[0] }))
    }
  } catch (fail) {
    yield put(updateErrorStatus({
      id: 'status.request.error',
      topic: 'auth.auth',
      detail: JSON.stringify(fail),
    }))
  }
}

export function tokenRefreshStart() {
  if (interval) {
    clearInterval(interval)
  }

  interval = setInterval(() => {
    dispatchAction(actions.refreshToken())
  }, REFRESH_INTERVAL)
}

export function tokenRefreshStop() {
  if (interval) {
    clearInterval(interval)
  }
}

export default function* tokenRefreshSaga() {
  yield takeLatest(types.REFRESH, refreshToken)
  yield takeLatest(types.START, tokenRefreshStart)
  yield takeLatest(types.STOP, tokenRefreshStop)
}
