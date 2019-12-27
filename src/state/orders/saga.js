import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import {
  formatRawSymbols, mapRequestPairs,
} from 'state/symbols/utils'
import { getQuery, getTargetQueryLimit, getTimeFrame } from 'state/query/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import { getPaginationData } from 'state/pagination/selectors'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import queryTypes from 'state/query/constants'
import { fetchNext } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getOrders } from './selectors'

const TYPE = queryTypes.MENU_ORDERS

function getReqOrders({
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
  return makeFetchCall('getOrders', params)
}

function* fetchOrders({ payload }) {
  const { nextFetch = false } = payload
  try {
    const { entries, targetPairs } = yield select(getOrders)
    const { offset, smallestMts } = yield select(getPaginationData, TYPE)
    const queryLimit = yield select(getTargetQueryLimit, TYPE)

    // data exist, no need to fetch again
    if (nextFetch && entries.length - queryLimit >= offset) {
      return
    }

    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const { result: resulto, error: erroro } = yield call(getReqOrders, {
      smallestMts,
      query,
      targetPairs,
      filter,
      queryLimit,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqOrders, {
      smallestMts,
      query,
      targetPairs,
      filter,
      queryLimit,
    })
    yield put(actions.updateOrders(result))
    yield put(updatePagination(TYPE, result, queryLimit))

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

function* refreshLedgers() {
  yield put(refreshPagination(TYPE))
}

function* fetchOrdersFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* ordersSaga() {
  yield takeLatest(types.FETCH_ORDERS, fetchOrders)
  yield takeLatest(types.REFRESH, refreshLedgers)
  yield takeLatest(types.FETCH_FAIL, fetchOrdersFail)
}
