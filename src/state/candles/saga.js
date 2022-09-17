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
import goToRangeTypes, { OFFSETS } from 'state/goToRange/constants'
import { setGoToRange, handleGoToRange, setGoToRangePreserve } from 'state/goToRange/actions'
import { updateErrorStatus } from 'state/status/actions'
import { getTimeFrame } from 'state/timeRange/selectors'
import { formatRawSymbols, mapRequestPairs } from 'state/symbols/utils'

import types, { SCROLL_THRESHOLD } from './constants'
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
  const { start, end } = yield select(getTimeFrame, data.nextPage)
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
  yield put(setTimeRange({
    start: (start - (OFFSETS[timeframe] * 4)),
    end: (end + (OFFSETS[timeframe] * 4)),
    range: rangeTypes.CUSTOM,
  }))
  try {
    yield call(fetchCandles, { payload: 'candles' })
    yield call(fetchCandles, { payload: 'trades' })
    yield put(setGoToRange(payload))
    yield put(setGoToRangePreserve(true))
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'candles.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* handleChartScrollTime({ payload }) {
  const { currentScrollTime } = payload
  const { start, end } = yield select(getTimeFrame)
  const timeFrame = yield select(selectors.getCandlesTimeFrame)
  const shouldUpdateStart = (currentScrollTime - SCROLL_THRESHOLD[timeFrame]) < start
  const shouldUpdateEnd = (currentScrollTime + SCROLL_THRESHOLD[timeFrame]) > end
  if (shouldUpdateStart || shouldUpdateEnd) {
    const params = {
      range: goToRangeTypes.DATE,
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
