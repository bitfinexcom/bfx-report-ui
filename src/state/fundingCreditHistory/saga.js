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
import { getTargetSymbols, getFundingCreditHistory } from './selectors'

function getReqFCredit(auth, query, targetSymbols, smallestMts) {
  const params = getTimeFrame(query, queryTypes.MENU_FCREDIT, smallestMts)
  if (targetSymbols.length > 0) {
    params.symbol = formatRawSymbolToFSymbol(targetSymbols)
  }
  return makeFetchCall('getFundingCreditHistory', auth, params)
}

function* fetchFCredit({ payload: symbol }) {
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
    const { result = [], error } = yield call(getReqFCredit, auth, query, targetSymbols, 0)
    yield put(actions.updateFCredit(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'fcredit.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'fcredit.title',
      detail: JSON.stringify(fail),
    }))
  }
}

const LIMIT = queryTypes.DEFAULT_FCREDIT_QUERY_LIMIT

function* fetchNextFCredit() {
  try {
    const {
      offset,
      entries,
      smallestMts,
      targetSymbol,
    } = yield select(getFundingCreditHistory)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqFCredit, auth, query, targetSymbol, smallestMts)
    yield put(actions.updateFCredit(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'fcredit.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'fcredit.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchFCreditFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* ordersSaga() {
  yield takeLatest(types.FETCH_FCREDIT, fetchFCredit)
  yield takeLatest(types.FETCH_NEXT_FCREDIT, fetchNextFCredit)
  yield takeLatest(types.FETCH_FAIL, fetchFCreditFail)
}
