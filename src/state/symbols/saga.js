import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'
import types from 'state/auth/constants'
import { selectAuth } from 'state/auth/selectors'

import actions from './actions'

function getSymbols(auth) {
  return makeFetchCall('getSymbols', auth)
}

function* fetchSymbols({ payload: success }) {
  if (!success) {
    return
  }

  try {
    const auth = yield select(selectAuth)
    const { result, error } = yield call(getSymbols, auth)
    if (result) {
      yield put(actions.updateSymbols(result))
    }
    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'symbols.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateErrorStatus({
      id: 'status.request.error',
      topic: 'symbols.title',
      detail: JSON.stringify(fail),
    }))
  }
}

export default function* symbolsSaga() {
  yield takeLatest(types.AUTH_SUCCESS, fetchSymbols)
}
