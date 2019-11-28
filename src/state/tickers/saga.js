import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, mapRequestPairs } from 'state/symbols/utils'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit, getPageSize } from 'state/query/utils'
import { fetchNext } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getTickers, getTargetPairs } from './selectors'

const TYPE = queryTypes.MENU_TICKERS
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

function getReqTickers({
  smallestMts,
  query,
  targetPairs,
  filter,
}) {
  const params = getTimeFrame(query, smallestMts)
  params.limit = LIMIT
  params.filter = filter
  if (targetPairs.length) {
    params.symbol = formatRawSymbols(mapRequestPairs(targetPairs))
  }
  return makeFetchCall('getTickersHistory', params)
}

function* fetchTickers() {
  try {
    const targetPairs = yield select(getTargetPairs)
    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const { result: resulto, error: erroro } = yield call(getReqTickers, {
      smallestMts: 0,
      query,
      targetPairs,
      filter,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqTickers, {
      smallestMts: 0,
      query,
      targetPairs,
      filter,
    })
    yield put(actions.updateTickers(result, LIMIT, PAGE_SIZE))

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
    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const { result: resulto, error: erroro } = yield call(getReqTickers, {
      smallestMts,
      query,
      targetPairs,
      filter,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqTickers, {
      smallestMts,
      query,
      targetPairs,
      filter,
    })
    yield put(actions.updateTickers(result, LIMIT, PAGE_SIZE))

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
