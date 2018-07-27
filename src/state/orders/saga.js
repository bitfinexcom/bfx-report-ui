import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { postJsonfetch, selectAuth } from 'state/utils'
import { getTimeFrame } from 'state/query/selector'
import statusTypes from 'state/status/constants'
import queryTypes from 'state/query/constants'
import { platform } from 'var/config'
import types from './constants'

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
    const data = yield call(getOrders, auth, query, 0)
    yield put({
      type: types.UPDATE_ORDERS,
      payload: (data && data.result) || [],
    })

    if (data && data.error) {
      yield put({
        type: statusTypes.UPDATE_ERROR_STATUS,
        payload: `Orders fail ${JSON.stringify(data.error)}`,
      })
    }
  } catch (error) {
    yield put({
      type: statusTypes.UPDATE_ERROR_STATUS,
      payload: `Orders request fail ${JSON.stringify(error)}`,
    })
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
    const data = yield call(getOrders, auth, query, smallestMts)
    yield put({
      type: types.UPDATE_ORDERS,
      payload: (data && data.result) || [],
    })

    if (data && data.error) {
      yield put({
        type: statusTypes.UPDATE_ERROR_STATUS,
        payload: `Orders fail ${JSON.stringify(data.error)}`,
      })
    }
  } catch (error) {
    yield put({
      type: statusTypes.UPDATE_ERROR_STATUS,
      payload: `Orders request fail ${JSON.stringify(error)}`,
    })
  }
}

export default function* ordersSaga() {
  yield takeLatest(types.FETCH_ORDERS, fetchOrders)
  yield takeLatest(types.FETCH_NEXT_ORDERS, fetchNextOrders)
}
