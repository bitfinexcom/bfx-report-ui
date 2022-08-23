import {
  put,
  takeLatest,
} from 'redux-saga/effects'

import { formatSumUpValue } from 'utils/columns'
import { updateStatus } from 'state/status/actions'

import types from './constants'

function* showColumnSumUp({ payload }) {
  const sum = formatSumUpValue(payload)
  yield put(updateStatus({
    id: 'sum_up_cols',
    sum,
  }))
  yield navigator.clipboard.writeText(sum)
}

export default function* columnsSaga() {
  yield takeLatest(types.SHOW_COLUMNS_SUM, showColumnSumUp)
}
