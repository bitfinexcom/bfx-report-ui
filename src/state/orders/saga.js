import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { postJsonfetch } from 'state/utils'
import { selectAuth } from 'state/auth/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { platform } from 'var/config'

import types from './constants'
import actions from './actions'
import { getOrders } from './selectors'

function getReqOrders(auth, query, smallestMts) {
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
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqOrders, auth, query, 0)
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
    const { offset, entries, smallestMts } = yield select(getOrders)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqOrders, auth, query, smallestMts)
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
