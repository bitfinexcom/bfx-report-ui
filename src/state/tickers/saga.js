import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, mapRequestPairs } from 'state/symbols/utils'
import { getTimeFrame } from 'state/timeRange/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getPaginationData } from 'state/pagination/selectors'
import queryTypes from 'state/query/constants'
import { getQueryLimit } from 'state/query/utils'
import { fetchDataWithPagination } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getTickers } from './selectors'

const TYPE = queryTypes.MENU_TICKERS

function getReqTickers({
  start,
  end,
  targetPairs,
  filter,
}) {
  const params = {
    start,
    end,
    filter,
    limit: getQueryLimit(TYPE),
    symbol: formatRawSymbols(mapRequestPairs(targetPairs)),
  }
  return makeFetchCall('getTickersHistory', params)
}

function* fetchTickers() {
  try {
    const { targetPairs } = yield select(getTickers)
    const { smallestMts } = yield select(getPaginationData, TYPE)
    const { start, end } = yield select(getTimeFrame, smallestMts)
    const filter = yield select(getFilterQuery, TYPE)

    const { result, error } = yield call(fetchDataWithPagination, getReqTickers, {
      start,
      end,
      targetPairs,
      filter,
    })
    yield put(actions.updateTickers(result))
    yield put(updatePagination(TYPE, result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'tickers.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'tickers.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshTickers() {
  yield put(refreshPagination(TYPE))
}

function* fetchTickersFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* tickersSaga() {
  yield takeLatest(types.FETCH_TICKERS, fetchTickers)
  yield takeLatest([types.REFRESH, types.ADD_PAIR, types.REMOVE_PAIR], refreshTickers)
  yield takeLatest(types.FETCH_FAIL, fetchTickersFail)
}
