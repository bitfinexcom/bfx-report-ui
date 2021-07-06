import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { toggleErrorDialog } from 'state/ui/actions'
import { updateErrorStatus } from 'state/status/actions'
import { getTimeFrame } from 'state/timeRange/selectors'

import types from './constants'
import actions from './actions'
import selectors from './selectors'

export const getReqBalance = params => makeFetchCall('getBalanceHistory', params)

/* eslint-disable-next-line consistent-return */
export function* fetchAccountBalance() {
  try {
    const timeframe = yield select(selectors.getTimeframe)
    const { start, end } = yield select(getTimeFrame)
    const params = {
      timeframe,
      start,
      end,
    }
    const { result = [], error } = yield call(getReqBalance, params)
    yield put(actions.updateBalance(result))

    if (error) {
      yield put(toggleErrorDialog(true, error.message))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'accountbalance.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshAccountBalance() {
  yield put(actions.fetchBalance())
}

function* fetchAccountBalanceFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* accountBalanceSaga() {
  yield takeLatest(types.FETCH_BALANCE, fetchAccountBalance)
  yield takeLatest(types.REFRESH, refreshAccountBalance)
  yield takeLatest(types.FETCH_FAIL, fetchAccountBalanceFail)
}
