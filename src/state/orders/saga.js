import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import {
  formatRawSymbols, getSymbolsURL, getPairsFromUrlParam, mapPair, mapRequestPairs,
} from 'state/symbols/utils'
import { selectAuth } from 'state/auth/selectors'
import { getQuery, getTargetQueryLimit, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getPageSize } from 'state/query/utils'
import { fetchNext } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getOrders, getTargetPairs } from './selectors'

const TYPE = queryTypes.MENU_ORDERS
const PAGE_SIZE = getPageSize(TYPE)

function getReqOrders({
  smallestMts,
  auth,
  query,
  targetPairs,
  queryLimit,
}) {
  const params = getTimeFrame(query, smallestMts)
  if (targetPairs.length) {
    params.symbol = formatRawSymbols(mapRequestPairs(targetPairs))
  }
  if (queryLimit) {
    params.limit = queryLimit
  }
  return makeFetchCall('getOrders', auth, params)
}

function* fetchOrders({ payload: pair }) {
  try {
    let targetPairs = yield select(getTargetPairs)
    const pairsUrl = getSymbolsURL(targetPairs)
    // set pair from url
    if (pair && pair !== pairsUrl) {
      targetPairs = getPairsFromUrlParam(pair).map(mapPair)
      yield put(actions.setTargetPairs(targetPairs))
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const getQueryLimit = yield select(getTargetQueryLimit)
    const queryLimit = getQueryLimit(TYPE)
    const { result: resulto, error: erroro } = yield call(getReqOrders, {
      smallestMts: 0,
      auth,
      query,
      targetPairs,
      queryLimit,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqOrders, {
      smallestMts: 0,
      auth,
      query,
      targetPairs,
      queryLimit,
    })
    yield put(actions.updateOrders(result, queryLimit, PAGE_SIZE))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'orders.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'orders.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchNextOrders() {
  try {
    const {
      offset,
      entries,
      smallestMts,
      targetPairs,
    } = yield select(getOrders)
    const getQueryLimit = yield select(getTargetQueryLimit)
    const queryLimit = getQueryLimit(TYPE)
    // data exist, no need to fetch again
    if (entries.length - queryLimit >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result: resulto, error: erroro } = yield call(getReqOrders, {
      smallestMts,
      auth,
      query,
      targetPairs,
      queryLimit,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqOrders, {
      smallestMts,
      auth,
      query,
      targetPairs,
      queryLimit,
    })
    yield put(actions.updateOrders(result, queryLimit, PAGE_SIZE))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'orders.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'orders.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchOrdersFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* ordersSaga() {
  yield takeLatest(types.FETCH_ORDERS, fetchOrders)
  yield takeLatest(types.FETCH_NEXT_ORDERS, fetchNextOrders)
  yield takeLatest(types.FETCH_FAIL, fetchOrdersFail)
}
