import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, mapRequestPairs } from 'state/symbols/utils'
import { getTimeFrame } from 'state/timeRange/selectors'
import { getQueryLimit } from 'state/query/utils'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import { getPaginationData } from 'state/pagination/selectors'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import queryTypes from 'state/query/constants'
import { fetchDataWithPagination } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getOrders } from './selectors'

const TYPE = queryTypes.MENU_ORDERS

function getReqOrders({
  start,
  end,
  targetPairs,
  filter,
}) {
  const params = {
    start,
    end,
    limit: getQueryLimit(TYPE),
    filter,
    symbol: formatRawSymbols(mapRequestPairs(targetPairs)),
  }
  return makeFetchCall('getOrders', params)
}

function* fetchOrders() {
  try {
    const { targetPairs } = yield select(getOrders)
    const { smallestMts } = yield select(getPaginationData, TYPE)
    const { start, end } = yield select(getTimeFrame, smallestMts)
    const filter = yield select(getFilterQuery, TYPE)
    const { result, error } = yield call(fetchDataWithPagination, getReqOrders, {
      start,
      end,
      targetPairs,
      filter,
    })
    yield put(actions.updateOrders(result))
    yield put(updatePagination(TYPE, result))

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

function* refreshOrders() {
  yield put(refreshPagination(TYPE))
}

function* fetchOrdersFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* ordersSaga() {
  yield takeLatest(types.FETCH_ORDERS, fetchOrders)
  yield takeLatest([types.REFRESH, types.ADD_PAIR, types.REMOVE_PAIR, types.CLEAR_PAIRS], refreshOrders)
  yield takeLatest(types.FETCH_FAIL, fetchOrdersFail)
}
