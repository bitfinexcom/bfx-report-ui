import {
  all,
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import rangeTypes from 'state/timeRange/constants'
import { setTimeRange } from 'state/timeRange/actions'
import goToRangeTypes from 'state/goToRange/constants'
import { setGoToRange, handleGoToRange } from 'state/goToRange/actions'
import { updateErrorStatus } from 'state/status/actions'
import { getTimeFrame } from 'state/timeRange/selectors'
import { formatRawSymbols, mapRequestPairs } from 'state/symbols/utils'

import types from './constants'
import actions from './actions'
import selectors from './selectors'

// export const OFFSETS = {
//   '1m': 2629800000, 1 month
//   '5m': 5259600000,
//   '15m': 7889400000,
//   '30m': 7889400000,
//   '1h': 10519200000,
//   '3h': 13149000000,
//   '6h': 13149000000,
//   '12h': 15778800000,
//   '1D': 15778800000,
//   '7D': 15778800000,
//   '14D': 15778800000,
//   '1M': 15778800000,
// }

export const OFFSETS = {
  '1m': 2629800000,
  '5m': 2629800000,
  '15m': 2629800000,
  '30m': 2629800000,
  '1h': 432000000,
  '3h': 2629800000,
  '6h': 2629800000,
  '12h': 2629800000,
  '1D': 2629800000,
  '7D': 2629800000,
  '14D': 2629800000,
  '1M': 2629800000,
}

export const OFFSETS2 = {
  '1m': 86400000,
  '5m': 86400000,
  '15m': 86400000,
  '30m': 86400000,
  '1h': 86400000,
  '3h': 2629800000,
  '6h': 2629800000,
  '12h': 2629800000,
  '1D': 2629800000,
  '7D': 2629800000,
  '14D': 2629800000,
  '1M': 2629800000,
}

const getReqCandles = (params) => {
  const {
    start,
    end,
    pair,
    timeframe,
  } = params

  console.log('+++getReqCandles params', params)

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

function* fetchData(section, data, method, customTimeframe = null) {
  const params = yield select(selectors.getParams)
  let start
  let end
  if (customTimeframe) {
    start = customTimeframe?.start
    end = customTimeframe?.end
  } else {
    const timeframe = yield select(getTimeFrame, data.nextPage)
    start = timeframe?.start
    end = timeframe?.end
  }
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

function* handleGoToRangeSaga({ payload }) {
  const { start, end } = payload
  const timeframe = yield select(selectors.getCandlesTimeFrame)
  console.log('++payload', payload)

  yield put(setTimeRange({
    start: (start - OFFSETS2[timeframe]),
    end: (end + OFFSETS2[timeframe]),
    range: rangeTypes.CUSTOM,
  }))
  try {
    yield call(fetchCandles, { payload: 'candles' })
    yield call(fetchCandles, { payload: 'trades' })
    yield put(setGoToRange(payload))
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'candles.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* handleChartScrollTime({ payload }) {
  const { prevScrollTime, currentScrollTime } = payload
  const { start, end } = yield select(getTimeFrame)
  const timeFrame = yield select(selectors.getCandlesTimeFrame)

  if (((currentScrollTime - OFFSETS2[timeFrame]) < start) || ((currentScrollTime + OFFSETS2[timeFrame]) > end)) {
    console.log('+++SHOULD UPDATE EDTIME)')
    const params = {
      range: 'date',
      start: currentScrollTime,
      end: currentScrollTime,
      timeFrame,
    }
    yield put(handleGoToRange(params))
  }
}

export default function* candlesSaga() {
  yield takeLatest(types.FETCH, fetchCandles)
  yield takeLatest(types.REFRESH, refreshCandles)
  yield takeLatest(types.FETCH_FAIL, fetchCandlesFail)
  yield takeLatest(types.HANDLE_CHART_SCROLL_TIME, handleChartScrollTime)
  yield takeLatest(goToRangeTypes.HANDLE_GO_TO_RANGE, handleGoToRangeSaga)
}
