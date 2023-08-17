import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, mapRequestPairs } from 'state/symbols/utils'
import { updateErrorStatus } from 'state/status/actions'

import types from './constants'
import actions from './actions'
import selectors from './selectors'

const getReqOrderTrades = ({ id, targetPair }) => {
  const params = {
    id,
    symbol: formatRawSymbols(mapRequestPairs(targetPair, true)),
  }
  return makeFetchCall('getOrderTrades', params)
}

function* fetchOrderTrades() {
  try {
    const params = yield select(selectors.getParams)
    const { result, error } = yield call(getReqOrderTrades, params)

    yield put(actions.updateOrderTrades(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'ordertrades.title',
        detail: error?.message ?? JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'ordertrades.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchOrderTradesFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* orderTradesSaga() {
  yield takeLatest(types.FETCH_ORDER_TRADES, fetchOrderTrades)
  yield takeLatest(types.FETCH_FAIL, fetchOrderTradesFail)
}
