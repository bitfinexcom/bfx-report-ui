import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, mapRequestPairs } from 'state/symbols/utils'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getPaginationData } from 'state/pagination/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit } from 'state/query/utils'
import { fetchData } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getPublicTrades } from './selectors'

const TYPE = queryTypes.MENU_PUBLIC_TRADES
const LIMIT = getQueryLimit(TYPE)

function getReqPublicTrades({
  smallestMts,
  query,
  targetPair,
  filter,
}) {
  const params = getTimeFrame(query, smallestMts)
  params.limit = LIMIT
  params.filter = filter
  if (targetPair) {
    params.symbol = formatRawSymbols(mapRequestPairs(targetPair, true))
  }
  return makeFetchCall('getPublicTrades', params)
}

function* fetchPublicTrades({ payload }) {
  const { nextFetch = false } = payload
  try {
    const { entries, targetPair } = yield select(getPublicTrades)
    const { offset, smallestMts } = yield select(getPaginationData, TYPE)

    // data exist, no need to fetch again
    if (nextFetch && entries.length - LIMIT >= offset) {
      return
    }
    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const { result, error } = yield call(fetchData, getReqPublicTrades, {
      smallestMts,
      query,
      targetPair,
      filter,
    })
    yield put(actions.updatePublicTrades(result))
    yield put(updatePagination(TYPE, result, LIMIT))

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
  yield takeLatest(types.REFRESH, refreshPublicTrades)
  yield takeLatest(types.FETCH_FAIL, fetchPublicTradesFail)
}
