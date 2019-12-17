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
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getPaginationData } from 'state/pagination/selectors'
import queryTypes from 'state/query/constants'
import { getQueryLimit } from 'state/query/utils'
import { fetchData } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getTickers } from './selectors'

const TYPE = queryTypes.MENU_TICKERS
const LIMIT = getQueryLimit(TYPE)

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

function* fetchTickers({ payload }) {
  const { nextFetch = false } = payload
  try {
    const { entries, targetPairs } = yield select(getTickers)
    const { offset, smallestMts } = yield select(getPaginationData, TYPE)
    const query = yield select(getQuery)

    // data exist, no need to fetch again
    if (nextFetch && entries.length - LIMIT >= offset) {
      return
    }
    const filter = yield select(getFilterQuery, TYPE)
    const { result, error } = yield call(fetchData, getReqTickers, {
      smallestMts,
      query,
      targetPairs,
      filter,
    })
    yield put(actions.updateTickers(result))
    yield put(updatePagination(TYPE, result, LIMIT))

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

function* refreshTickers() {
  yield put(refreshPagination(TYPE))
}

function* fetchTickersFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* tickersSaga() {
  yield takeLatest(types.FETCH_TICKERS, fetchTickers)
  yield takeLatest(types.REFRESH, refreshTickers)
  yield takeLatest(types.FETCH_FAIL, fetchTickersFail)
}
