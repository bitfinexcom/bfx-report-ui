import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, getSymbolsURL, getPairsFromUrlParam } from 'state/symbols/utils'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { selectAuth } from 'state/auth/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit } from 'state/query/utils'

import types from './constants'
import actions from './actions'
import { getTrades, getTargetPairs } from './selectors'

const TYPE = queryTypes.MENU_TRADES
const LIMIT = getQueryLimit(TYPE)

function getReqTrades(auth, query, targetPairs, smallestMts) {
  const params = getTimeFrame(query, TYPE, smallestMts)
  if (targetPairs.length > 0) {
    params.symbol = formatRawSymbols(targetPairs)
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
    const { result = [], error } = yield call(getReqTrades, auth, query, targetPairs, 0)
    yield put(actions.updateTrades(result))

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
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqTrades, auth, query, targetPairs, smallestMts)
    yield put(actions.updateTrades(result))

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
