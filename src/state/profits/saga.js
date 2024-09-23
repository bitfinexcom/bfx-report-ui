import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'
import { getTimeFrame } from 'state/timeRange/selectors'
import timeframeConstants from 'ui/TimeFrameSelector/constants'
import unrealizedProfitConstants from 'ui/UnrealizedProfitSelector/constants'

import types from './constants'
import actions from './actions'

export const getReqWinLoss = params => makeFetchCall('getWinLoss', params)

export function* fetchProfits() {
  try {
    const { start, end } = yield select(getTimeFrame)
    const { result = [], error } = yield call(getReqWinLoss,
      {
        end,
        start,
        timeframe: timeframeConstants.DAY,
        isUnrealizedProfitExcluded: unrealizedProfitConstants.FALSE,
      })
    yield put(actions.updateProfits(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'summary.profits.title',
        detail: error?.message ?? JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'summary.profits.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshProfits() {
  yield put(actions.fetchProfits())
}

function* fetchProfitsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* profitsSaga() {
  yield takeLatest(types.FETCH_PROFITS, fetchProfits)
  yield takeLatest(types.REFRESH, refreshProfits)
  yield takeLatest(types.FETCH_FAIL, fetchProfitsFail)
}
