// Return the positions of a user between two dates
// https://docs.bitfinex.com/v2/reference#rest-auth-positions
import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import {
  formatRawSymbols, getSymbolsURL, getPairsFromUrlParam, mapPair, mapRequestPairs,
} from 'state/symbols/utils'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit, getPageSize } from 'state/query/utils'
import { fetchNext } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getPositions, getTargetPairs } from './selectors'

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

function* fetchPositions({ payload: pair }) {
  try {
    let targetPairs = yield select(getTargetPairs)
    const pairsUrl = getSymbolsURL(targetPairs)
    // set pair from url
    if (pair && pair !== pairsUrl) {
      targetPairs = getPairsFromUrlParam(pair).map(mapPair)
      yield put(actions.setTargetPairs(targetPairs))
    }
    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const { result: resulto, error: erroro } = yield call(getReqPositions, {
      smallestMts: 0,
      query,
      targetPairs,
      filter,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqPositions, {
      smallestMts: 0,
      query,
      targetPairs,
      filter,
    })
    yield put(actions.updatePositions(result, LIMIT, PAGE_SIZE))

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

function* fetchNextPositions() {
  try {
    const {
      offset,
      entries,
      smallestMts,
      targetPairs,
    } = yield select(getPositions)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const query = yield select(getQuery)
    const { result: resulto, error: erroro } = yield call(getReqPositions, {
      smallestMts,
      query,
      targetPairs,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqPositions, {
      smallestMts,
      query,
      targetPairs,
    })
    yield put(actions.updatePositions(result, LIMIT, PAGE_SIZE))

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

function* fetchPositionsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* positionsSaga() {
  yield takeLatest(types.FETCH_POSITIONS, fetchPositions)
  yield takeLatest(types.FETCH_NEXT_POSITIONS, fetchNextPositions)
  yield takeLatest(types.FETCH_FAIL, fetchPositionsFail)
}
