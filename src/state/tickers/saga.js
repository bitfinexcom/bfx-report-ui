import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, getSymbolsURL, getPairsFromUrlParam } from 'state/symbols/utils'
import { selectAuth } from 'state/auth/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit } from 'state/query/utils'

import types from './constants'
import actions from './actions'
import { getTickers, getTargetPairs } from './selectors'

const TYPE = queryTypes.MENU_TICKERS
const LIMIT = getQueryLimit(TYPE)

function getReqTickers(auth, query, targetPairs, smallestMts) {
  const params = getTimeFrame(query, TYPE, smallestMts)
  if (targetPairs.length > 0) {
    params.symbol = formatRawSymbols(targetPairs)
  }
  return makeFetchCall('getTickersHistory', auth, params)
}

function* fetchTickers({ payload: pair }) {
  try {
    let targetPairs = yield select(getTargetPairs)
    const pairsUrl = getSymbolsURL(targetPairs)
    // set pair from url
    if (pair && pair !== pairsUrl) {
      targetPairs = getPairsFromUrlParam(pair)
      yield put(actions.setTargetPairs(targetPairs))
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqTickers, auth, query, targetPairs, 0)
    yield put(actions.updateTickers(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'tickers.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'tickers.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchNextTickers() {
  try {
    const {
      offset,
      entries,
      smallestMts,
      targetPairs,
    } = yield select(getTickers)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqTickers, auth, query, targetPairs, smallestMts)
    yield put(actions.updateTickers(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'tickers.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'tickers.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchTickersFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* tickersSaga() {
  yield takeLatest(types.FETCH_TICKERS, fetchTickers)
  yield takeLatest(types.FETCH_NEXT_TICKERS, fetchNextTickers)
  yield takeLatest(types.FETCH_FAIL, fetchTickersFail)
}
