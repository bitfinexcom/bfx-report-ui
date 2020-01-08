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
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getPaginationData } from 'state/pagination/selectors'
import queryTypes from 'state/query/constants'
import { fetchData } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getTrades } from './selectors'

const TYPE = queryTypes.MENU_TRADES

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

function* fetchTrades({ payload }) {
  const { nextFetch = false } = payload
  try {
    const { entries, targetPairs } = yield select(getTrades)
    const { offset, smallestMts } = yield select(getPaginationData, TYPE)
    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const queryLimit = yield select(getTargetQueryLimit, TYPE)

    // data exist, no need to fetch again
    if (nextFetch && entries.length - queryLimit >= offset) {
      return
    }

    const { result, error } = yield call(fetchData, getReqTrades, {
      smallestMts,
      query,
      targetPairs,
      filter,
      queryLimit,
    })
    yield put(actions.updateTrades(result))
    yield put(updatePagination(TYPE, result, queryLimit))

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

function* refreshTrades() {
  yield put(refreshPagination(TYPE))
}

function* fetchTradesFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* tradesSaga() {
  yield takeLatest(types.FETCH_TRADES, fetchTrades)
  yield takeLatest(types.REFRESH, refreshTrades)
  yield takeLatest(types.FETCH_FAIL, fetchTradesFail)
}
