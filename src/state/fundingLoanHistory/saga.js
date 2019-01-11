import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, getSymbolsURL, getSymbolsFromUrlParam } from 'state/symbols/utils'
import { selectAuth } from 'state/auth/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit } from 'state/query/utils'

import types from './constants'
import actions from './actions'
import { getTargetSymbols, getFundingLoanHistory } from './selectors'

const TYPE = queryTypes.MENU_FLOAN
const LIMIT = getQueryLimit(TYPE)

function getReqFLoan(auth, query, targetSymbols, smallestMts) {
  const params = getTimeFrame(query, smallestMts)
  params.limit = LIMIT
  if (targetSymbols.length > 0) {
    params.symbol = formatRawSymbols(targetSymbols)
  }
  return makeFetchCall('getFundingLoanHistory', auth, params)
}

function* fetchFLoan({ payload: symbol }) {
  try {
    let targetSymbols = yield select(getTargetSymbols)
    const symbolsUrl = getSymbolsURL(targetSymbols)
    // set symbol from url
    if (symbol && symbol !== symbolsUrl) {
      targetSymbols = getSymbolsFromUrlParam(symbol)
      yield put(actions.setTargetSymbols(targetSymbols))
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqFLoan, auth, query, targetSymbols, 0)
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

function* fetchNextFLoan() {
  try {
    const {
      offset,
      entries,
      smallestMts,
      targetSymbols,
    } = yield select(getFundingLoanHistory)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqFLoan, auth, query, targetSymbols, smallestMts)
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
