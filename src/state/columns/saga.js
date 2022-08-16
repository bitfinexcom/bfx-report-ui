import {
  put,
  takeLatest,
} from 'redux-saga/effects'

import { updateStatus } from 'state/status/actions'

import types from './constants'

function* showColumnSumUp({ payload }) {
  if (payload) {
    yield put(updateStatus({
      id: 'sum_up_cols',
      sum: payload.toFixed(8),
    }))
  }
}

export default function* columnsSaga() {
  yield takeLatest(types.GET_COLUMNS_SUM, showColumnSumUp)
}
