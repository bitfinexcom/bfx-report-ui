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
export function* fetchWinLoss() {
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
    yield put(actions.updateWinLoss(result))

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

function* refreshWinLoss() {
  const params = yield select(selectors.getParams)
  yield put(actions.fetchWinLoss(params))
}

function* fetchWinLossFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* winLossSaga() {
  yield takeLatest(types.FETCH_WIN_LOSS, fetchWinLoss)
  yield takeLatest(types.REFRESH, refreshWinLoss)
  yield takeLatest(types.FETCH_FAIL, fetchWinLossFail)
}
