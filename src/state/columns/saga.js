import {
  put,
  takeLatest,
} from 'redux-saga/effects'

import { formatSumUpValue } from 'utils/columns'
import { updateStatus, updateErrorStatus } from 'state/status/actions'

import types from './constants'

function* showColumnSumUp({ payload }) {
  const sum = formatSumUpValue(payload)
  try {
    yield put(updateStatus({
      id: 'sum_up_cols',
      sum,
    }))
    yield navigator.clipboard.writeText(sum)
  } catch (err) {
    yield put(updateErrorStatus({ id: err }))
  }
}

export default function* columnsSaga() {
  yield takeLatest(types.SHOW_COLUMNS_SUM, showColumnSumUp)
}
