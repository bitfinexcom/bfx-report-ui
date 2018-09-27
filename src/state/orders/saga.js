import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { formatRawPairToSymbol, createFetchCall } from 'state/utils'
import { selectAuth } from 'state/auth/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'

import types from './constants'
import actions from './actions'
import { getOrders, getTargetPair } from './selectors'

function getReqOrders(auth, query, targetPair, smallestMts) {
  const params = getTimeFrame(query, 'orders', smallestMts)
  if (targetPair) {
    params.symbol = formatRawPairToSymbol(targetPair)
  }
  return createFetchCall('getOrders', auth, params)
}

function* fetchOrders() {
  try {
    const targetPair = yield select(getTargetPair)
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqOrders, auth, query, targetPair, 0)
    yield put(actions.updateOrders(result))

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

const LIMIT = queryTypes.DEFAULT_ORDERS_QUERY_LIMIT

function* fetchNextOrders() {
  try {
    const {
      offset,
      entries,
      smallestMts,
      targetPair,
    } = yield select(getOrders)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqOrders, auth, query, targetPair, smallestMts)
    yield put(actions.updateOrders(result))

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
