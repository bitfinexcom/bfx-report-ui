import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, getSymbolsURL, getPairsFromUrlParam } from 'state/symbols/utils'
import { getQuery, getTargetQueryLimit, getTimeFrame } from 'state/query/selectors'
import { selectAuth } from 'state/auth/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getPageSize } from 'state/query/utils'
import { fetchNext } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getTrades, getTargetPairs } from './selectors'

const TYPE = queryTypes.MENU_TRADES
const PAGE_SIZE = getPageSize(TYPE)

// make sure the first params is the `smallestMts` to be processed by fetchNext helper
function getReqTrades(smallestMts, auth, query, targetPairs, queryLimit) {
  const params = getTimeFrame(query, smallestMts)
  if (targetPairs.length > 0) {
    params.symbol = formatRawSymbols(targetPairs)
  }
  if (queryLimit) {
    params.limit = queryLimit
  }
  return makeFetchCall('getTrades', auth, params)
}

function* fetchTrades({ payload: pair }) {
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
    const getQueryLimit = yield select(getTargetQueryLimit)
    const queryLimit = getQueryLimit(TYPE)
    const { result: resulto, error: erroro } = yield call(getReqTrades, 0, auth, query, targetPairs, queryLimit)
    const { result = {}, error } = yield call(
      fetchNext, resulto, erroro, getReqTrades, 0, auth, query, targetPairs, queryLimit,
    )
    yield put(actions.updateTrades(result, queryLimit, PAGE_SIZE))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'trades.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'trades.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchNextTrades() {
  try {
    const {
      offset,
      entries,
      smallestMts,
      targetPairs,
    } = yield select(getTrades)
    const getQueryLimit = yield select(getTargetQueryLimit)
    const queryLimit = getQueryLimit(TYPE)
    // data exist, no need to fetch again
    if (entries.length - queryLimit >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result: resulto, error: erroro } = yield call(
      getReqTrades, smallestMts, auth, query, targetPairs, queryLimit,
    )
    const { result = {}, error } = yield call(
      fetchNext, resulto, erroro, getReqTrades, smallestMts, auth, query, targetPairs, queryLimit,
    )
    yield put(actions.updateTrades(result, queryLimit, PAGE_SIZE))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'trades.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'trades.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchTradesFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* tradesSaga() {
  yield takeLatest(types.FETCH_TRADES, fetchTrades)
  yield takeLatest(types.FETCH_NEXT_TRADES, fetchNextTrades)
  yield takeLatest(types.FETCH_FAIL, fetchTradesFail)
}
