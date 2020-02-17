import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'

import types from './constants'
import actions from './actions'

export const getReqAccountSummary = () => makeFetchCall('getAccountSummary')

export function* fetchAccountSummary() {
  try {
    const { result = {}, error } = yield call(getReqAccountSummary)
    yield put(actions.updateData(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'accountsummary.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'accountsummary.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshAccountSummary() {
  yield put(actions.fetchData())
}

function* fetchAccountSummaryFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* accountSummarySaga() {
  yield takeLatest(types.FETCH, fetchAccountSummary)
  yield takeLatest(types.REFRESH, refreshAccountSummary)
  yield takeLatest(types.FETCH_FAIL, fetchAccountSummaryFail)
}
