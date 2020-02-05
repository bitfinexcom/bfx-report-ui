import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'

import types from './constants'
import actions from './actions'
import selectors from './selectors'

export const getReqCandles = params => makeFetchCall('getCandles', {
  ...params,
  limit: 24,
})

export function* fetchCandles() {
  try {
    const params = yield select(selectors.getParams)
    const { result = [], error } = yield call(getReqCandles, params)
    yield put(actions.updateData(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'candles.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'candles.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshCandles() {
  const params = yield select(selectors.getParams)
  yield put(actions.fetchData(params))
}

function* fetchCandlesFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* candlesSaga() {
  yield takeLatest(types.FETCH, fetchCandles)
  yield takeLatest(types.REFRESH, refreshCandles)
  yield takeLatest(types.FETCH_FAIL, fetchCandlesFail)
}
