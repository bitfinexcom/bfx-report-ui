import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { postJsonfetch, selectAuth } from 'state/utils'
import { getTimeFrame } from 'state/query/selector'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { platform } from 'var/config'

import types from './constants'
import actions from './actions'

function getOrders(auth, query, smallestMts) {
  const params = getTimeFrame(query, 'orders', smallestMts)
  return postJsonfetch(`${platform.API_URL}/get-data`, {
    auth,
    method: 'getOrders',
    params,
  })
}

function* fetchOrders() {
  try {
    const auth = yield select(selectAuth)
    const query = yield select(state => state.query)
    const { result = [], error } = yield call(getOrders, auth, query, 0)
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
    const orders = yield select(state => state.orders)
    const { offset, entries, smallestMts } = orders
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(state => state.query)
    const { result = [], error } = yield call(getOrders, auth, query, smallestMts)
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

function* fetchOrdersFail(params) {
  yield put(updateErrorStatus(params))
}

export default function* ordersSaga() {
  yield takeLatest(types.FETCH_ORDERS, fetchOrders)
  yield takeLatest(types.FETCH_NEXT_ORDERS, fetchNextOrders)
  yield takeLatest(types.FETCH_FAIL, fetchOrdersFail)
}
