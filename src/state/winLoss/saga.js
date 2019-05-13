import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { selectAuth } from 'state/auth/selectors'
import { updateErrorStatus } from 'state/status/actions'
import { frameworkCheck } from 'state/ui/saga'

import types from './constants'
import actions from './actions'
import selectors from './selectors'

function getReqWinLoss({
  start,
  end,
  timeframe,
  auth,
}) {
  return makeFetchCall('getWinLoss', auth, { start, end, timeframe })
}

/* eslint-disable-next-line consistent-return */
function* fetchWinLoss({ payload }) {
  try {
    const shouldProceed = yield call(frameworkCheck)
    if (!shouldProceed) {
      // stop loading for first request
      return yield put(actions.updateWinLoss())
    }
    // save current query params in state for csv export reference and toggle loading
    yield put(actions.setParams(payload))

    const auth = yield select(selectAuth)
    const { result = [], error } = yield call(getReqWinLoss, { auth, ...payload })
    yield put(actions.updateWinLoss(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'averagewinloss.title',
        detail: JSON.stringify(error),
      }))
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
  yield call(fetchWinLoss, { payload: params })
}

function* fetchWinLossFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* winLossSaga() {
  yield takeLatest(types.FETCH_WIN_LOSS, fetchWinLoss)
  yield takeLatest(types.REFRESH, refreshWinLoss)
  yield takeLatest(types.FETCH_FAIL, fetchWinLossFail)
}
