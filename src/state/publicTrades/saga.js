import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, deformatPair } from 'state/symbols/utils'
import { getTimeFrame } from 'state/timeRange/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getPaginationData } from 'state/pagination/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit } from 'state/query/utils'
import { fetchDataWithPagination } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getPublicTrades } from './selectors'

const TYPE = queryTypes.MENU_PUBLIC_TRADES

function getReqPublicTrades({
  start,
  end,
  targetPair,
  filter,
}) {
  const params = {
    start,
    end,
    filter,
    limit: getQueryLimit(TYPE),
    symbol: formatRawSymbols(deformatPair(targetPair)),
  }

  return makeFetchCall('getPublicTrades', params)
}

function* fetchPublicTrades() {
  try {
    const { targetPair } = yield select(getPublicTrades)
    const { smallestMts } = yield select(getPaginationData, TYPE)
    const { start, end } = yield select(getTimeFrame, smallestMts)
    const filter = yield select(getFilterQuery, TYPE)
    const { result, error } = yield call(fetchDataWithPagination, getReqPublicTrades, {
      start,
      end,
      targetPair,
      filter,
    })
    yield put(actions.updatePublicTrades(result))
    yield put(updatePagination(TYPE, result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'publictrades.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'publictrades.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshPublicTrades() {
  yield put(refreshPagination(TYPE))
}

function* fetchPublicTradesFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* publicTradesSaga() {
  yield takeLatest(types.FETCH_PUBLIC_TRADES, fetchPublicTrades)
  yield takeLatest([types.REFRESH, types.SET_PAIR], refreshPublicTrades)
  yield takeLatest(types.FETCH_FAIL, fetchPublicTradesFail)
}
