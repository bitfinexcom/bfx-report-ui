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

function getReqBalance({
  start,
  end,
  timeframe,
  auth,
}) {
  return makeFetchCall('getBalanceHistory', auth, { start, end, timeframe })
}

/* eslint-disable-next-line consistent-return */
function* fetchAccountBalance({ payload }) {
  try {
    const shouldProceed = yield call(frameworkCheck)
    if (!shouldProceed) {
      // stop loading for first request
      return yield put(actions.updateBalance())
    }
    // save current query params in state for csv export reference and toggle loading
    yield put(actions.setParams(payload))

    const auth = yield select(selectAuth)
    const { result = [], error } = yield call(getReqBalance, { auth, ...payload })
    yield put(actions.updateBalance(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'accountbalance.title',
        detail: JSON.stringify(error),
      }))
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
  const params = yield select(selectors.getParams)
  yield call(fetchAccountBalance, { payload: params })
}

function* fetchAccountBalanceFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* accountBalanceSaga() {
  yield takeLatest(types.FETCH_BALANCE, fetchAccountBalance)
  yield takeLatest(types.REFRESH, refreshAccountBalance)
  yield takeLatest(types.FETCH_FAIL, fetchAccountBalanceFail)
}
