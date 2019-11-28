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
import { getPublicTrades, getTargetPair } from './selectors'

const TYPE = queryTypes.MENU_PUBLIC_TRADES
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

function getReqPublicTrades({
  smallestMts,
  query,
  targetPair,
  filter,
}) {
  const params = getTimeFrame(query, smallestMts)
  params.limit = LIMIT
  params.filter = filter
  if (targetPair) {
    params.symbol = formatRawSymbols(mapRequestPairs(targetPair, true))
  }
  return makeFetchCall('getPublicTrades', params)
}

function* fetchPublicTrades() {
  try {
    const targetPair = yield select(getTargetPair)
    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const { result: resulto, error: erroro } = yield call(getReqPublicTrades, {
      smallestMts: 0,
      query,
      targetPair,
      filter,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqPublicTrades, {
      smallestMts: 0,
      query,
      targetPair,
      filter,
    })
    yield put(actions.updatePublicTrades(result, LIMIT, PAGE_SIZE))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'publictrades.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'publictrades.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchNextPublicTrades() {
  try {
    const {
      offset,
      entries,
      smallestMts,
      targetPair,
    } = yield select(getPublicTrades)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const { result: resulto, error: erroro } = yield call(getReqPublicTrades, {
      smallestMts,
      query,
      targetPair,
      filter,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqPublicTrades, {
      smallestMts,
      query,
      targetPair,
      filter,
    })
    yield put(actions.updatePublicTrades(result, LIMIT, PAGE_SIZE))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'publictrades.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'publictrades.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchPublicTradesFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* publicTradesSaga() {
  yield takeLatest(types.FETCH_PUBLIC_TRADES, fetchPublicTrades)
  yield takeLatest(types.FETCH_NEXT_PUBLIC_TRADES, fetchNextPublicTrades)
  yield takeLatest(types.FETCH_FAIL, fetchPublicTradesFail)
}
