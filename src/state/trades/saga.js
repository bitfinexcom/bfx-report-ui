import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, mapRequestPairs } from 'state/symbols/utils'
import { getQuery, getTargetQueryLimit, getTimeFrame } from 'state/query/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getPageSize } from 'state/query/utils'
import { fetchNext } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getTrades, getTargetPairs } from './selectors'

const TYPE = queryTypes.MENU_TRADES
const PAGE_SIZE = getPageSize(TYPE)

function getReqTrades({
  smallestMts,
  query,
  targetPairs,
  filter,
  queryLimit,
}) {
  const params = getTimeFrame(query, smallestMts)
  params.filter = filter
  if (targetPairs.length) {
    params.symbol = formatRawSymbols(mapRequestPairs(targetPairs))
  }
  if (queryLimit) {
    params.limit = queryLimit
  }
  return makeFetchCall('getTrades', params)
}

function* fetchTrades() {
  try {
    const targetPairs = yield select(getTargetPairs)
    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const getQueryLimit = yield select(getTargetQueryLimit)
    const queryLimit = getQueryLimit(TYPE)
    const { result: resulto, error: erroro } = yield call(getReqTrades, {
      smallestMts: 0,
      query,
      targetPairs,
      filter,
      queryLimit,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqTrades, {
      smallestMts: 0,
      query,
      targetPairs,
      filter,
      queryLimit,
    })
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
    const filter = yield select(getFilterQuery, TYPE)
    const getQueryLimit = yield select(getTargetQueryLimit)
    const queryLimit = getQueryLimit(TYPE)
    // data exist, no need to fetch again
    if (entries.length - queryLimit >= offset) {
      return
    }
    const query = yield select(getQuery)
    const { result: resulto, error: erroro } = yield call(getReqTrades, {
      smallestMts,
      query,
      targetPairs,
      filter,
      queryLimit,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqTrades, {
      smallestMts,
      query,
      targetPairs,
      filter,
      queryLimit,
    })
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
