import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbolToFSymbol } from 'state/symbols/utils'
import { selectAuth } from 'state/auth/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'

import types from './constants'
import actions from './actions'
import { getTargetSymbol, getFundingLoanHistory } from './selectors'

function getReqFLoan(auth, query, targetSymbol, smallestMts) {
  const params = getTimeFrame(query, 'floan', smallestMts)
  if (targetSymbol) {
    params.symbol = formatRawSymbolToFSymbol(targetSymbol)
  }
  return makeFetchCall('getFundingLoanHistory', auth, params)
}

function* fetchFLoan() {
  try {
    const targetSymbol = yield select(getTargetSymbol)
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqFLoan, auth, query, targetSymbol, 0)
    yield put(actions.updateFLoan(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'floan.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'floan.title',
      detail: JSON.stringify(fail),
    }))
  }
}

const LIMIT = queryTypes.DEFAULT_FLOAN_QUERY_LIMIT

function* fetchNextFLoan() {
  try {
    const {
      offset,
      entries,
      smallestMts,
      targetSymbol,
    } = yield select(getFundingLoanHistory)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqFLoan, auth, query, targetSymbol, smallestMts)
    yield put(actions.updateFLoan(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'floan.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'floan.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchFLoanFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* ordersSaga() {
  yield takeLatest(types.FETCH_FLOAN, fetchFLoan)
  yield takeLatest(types.FETCH_NEXT_FLOAN, fetchNextFLoan)
  yield takeLatest(types.FETCH_FAIL, fetchFLoanFail)
}
