import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { selectAuth } from 'state/auth/selectors'
import { updateErrorStatus } from 'state/status/actions'

import types from './constants'
import actions from './actions'

function getReqRisk({
  start,
  end,
  timeframe,
  auth,
}) {
  return makeFetchCall('getRisk', auth, { start, end, timeframe })
}

function* fetchRisk({ payload }) {
  try {
    // save current query params in state for csv export reference and toggle loading
    yield put(actions.setParams(payload))

    const auth = yield select(selectAuth)
    const { result = [], error } = yield call(getReqRisk, { auth, ...payload })
    yield put(actions.updateRisk(result))

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

function* fetchRiskFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* riskSaga() {
  yield takeLatest(types.FETCH_RISK, fetchRisk)
  yield takeLatest(types.FETCH_FAIL, fetchRiskFail)
}
