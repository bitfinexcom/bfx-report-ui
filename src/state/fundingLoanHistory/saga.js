import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbolToFSymbol, getSymbolsURL, getSymbolsFromUrlParam } from 'state/symbols/utils'
import { selectAuth } from 'state/auth/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'

import types from './constants'
import actions from './actions'
import { getTargetSymbols, getFundingLoanHistory } from './selectors'

function getReqFLoan(auth, query, targetSymbols, smallestMts) {
  const params = getTimeFrame(query, queryTypes.MENU_FLOAN, smallestMts)
  if (targetSymbols.length > 0) {
    params.symbol = formatRawSymbolToFSymbol(targetSymbols)
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

const LIMIT = queryTypes.DEFAULT_FLOAN_QUERY_LIMIT

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
