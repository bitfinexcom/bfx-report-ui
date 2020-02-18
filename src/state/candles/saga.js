import {
  all,
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { formatRawSymbols, mapRequestPairs } from 'state/symbols/utils'

import types from './constants'
import actions from './actions'
import selectors from './selectors'

const getReqCandles = (params) => {
  const {
    start,
    end,
    pair,
    timeframe,
  } = params

  return makeFetchCall('getCandles', {
    start,
    end,
    timeframe,
    symbol: formatRawSymbols(mapRequestPairs(pair, true)),
  })
}

const getReqTrades = (params) => {
  const { start, end, pair } = params

  return makeFetchCall('getTrades', {
    start,
    end,
    symbol: formatRawSymbols(mapRequestPairs(pair, true)),
  })
}

function* fetchData(section, data, method) {
  const params = yield select(selectors.getParams)
  const query = yield select(getQuery)
  const { start, end } = getTimeFrame(query, data.nextPage)
  const { result, error } = yield call(method, {
    ...params,
    start,
    end,
  })
  yield put(actions.updateData({ [section]: result }))

  if (error) {
    yield put(actions.fetchFail({
      id: 'status.fail',
      topic: 'candles.title',
      detail: JSON.stringify(error),
    }))
  }
}

/* eslint-disable-next-line consistent-return */
export function* fetchCandles({ payload: type }) {
  try {
    const candles = yield select(selectors.getCandles)
    const trades = yield select(selectors.getTrades)
    if (type === 'candles') {
      return yield call(fetchData, 'candles', candles, getReqCandles)
    }
    if (type === 'trades') {
      return yield call(fetchData, 'trades', trades, getReqTrades)
    }

    yield all([
      call(fetchData, 'candles', candles, getReqCandles),
      call(fetchData, 'trades', trades, getReqTrades),
    ])
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'candles.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshCandles() {
  const params = yield select(selectors.getParams)
  yield put(actions.fetchData(params))
}

function* fetchCandlesFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* candlesSaga() {
  yield takeLatest(types.FETCH, fetchCandles)
  yield takeLatest(types.REFRESH, refreshCandles)
  yield takeLatest(types.FETCH_FAIL, fetchCandlesFail)
}
