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

export const getReqWinLoss = params => makeFetchCall('getWinLoss', params)
export const getReqWinLossVSAccountBalance = params => makeFetchCall('getWinLossVSAccountBalance', params)

/* eslint-disable-next-line consistent-return */
export function* fetchProfits() {
  try {
    const { start, end } = yield select(getTimeFrame)
    const {
      timeframe,
      isVSPrevDayBalance,
      isUnrealizedProfitExcluded,
      isVsAccountBalanceSelected,
    } = yield select(selectors.getParams)

    const { result = [], error } = yield call((isVsAccountBalanceSelected
      ? getReqWinLossVSAccountBalance
      : getReqWinLoss), {
      start,
      end,
      timeframe,
      isUnrealizedProfitExcluded,
      ...(isVsAccountBalanceSelected && { isVSPrevDayBalance }),
    })
    yield put(actions.updateProfits(result))

    if (error) {
      yield put(toggleErrorDialog(true, error.message))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'averagewinloss.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshProfits() {
  const params = yield select(selectors.getParams)
  yield put(actions.fetchProfits(params))
}

function* fetchProfitsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* profitsSaga() {
  yield takeLatest(types.FETCH_PROFITS, fetchProfits)
  yield takeLatest(types.REFRESH, refreshProfits)
  yield takeLatest(types.FETCH_FAIL, fetchProfitsFail)
}
