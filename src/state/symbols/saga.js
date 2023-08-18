import { call, put, takeLatest } from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'

import types from './constants'
import actions from './actions'

const getSymbols = () => makeFetchCall('getSymbols')

function* fetchSymbols() {
  try {
    const { result, error } = yield call(getSymbols)
    if (result) {
      yield put(actions.updateSymbols(result))
    }
    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'symbols.title',
        detail: error?.message ?? JSON.stringify(error),
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
  yield takeLatest(types.FETCH_SYMBOLS, fetchSymbols)
}
