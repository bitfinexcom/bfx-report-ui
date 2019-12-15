// Return the positions of a user between two dates
// https://docs.bitfinex.com/v2/reference#rest-auth-positions
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
import { updateErrorStatus } from 'state/status/actions'
import { getPaginationData } from 'state/pagination/selectors'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit, getPageSize } from 'state/query/utils'
import { fetchNext } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getPositions } from './selectors'

const TYPE = queryTypes.MENU_POSITIONS
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

function getReqPositions({
  smallestMts,
  query,
  targetPairs,
  filter,
}) {
  const params = getTimeFrame(query, smallestMts)
  params.limit = LIMIT
  params.filter = filter
  if (targetPairs.length) {
    params.symbol = formatRawSymbols(mapRequestPairs(targetPairs))
  }
  return makeFetchCall('getPositionsHistory', params)
}

function* fetchPositions({ payload }) {
  const { nextFetch = false } = payload
  try {
    const { entries, targetPairs } = yield select(getPositions)
    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const { offset, smallestMts } = yield select(getPaginationData, TYPE)

    // data exist, no need to fetch again
    if (nextFetch && entries.length - LIMIT >= offset) {
      return
    }

    const { result: resulto, error: erroro } = yield call(getReqPositions, {
      smallestMts,
      query,
      targetPairs,
      filter,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqPositions, {
      smallestMts,
      query,
      targetPairs,
      filter,
    })
    yield put(actions.updatePositions(result, LIMIT, PAGE_SIZE))
    yield put(updatePagination(TYPE, result, LIMIT))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'positions.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'positions.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshPositions() {
  yield put(refreshPagination(TYPE))
}

function* fetchPositionsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* positionsSaga() {
  yield takeLatest(types.FETCH_POSITIONS, fetchPositions)
  yield takeLatest(types.REFRESH, refreshPositions)
  yield takeLatest(types.FETCH_FAIL, fetchPositionsFail)
}
