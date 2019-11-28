import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit, getPageSize } from 'state/query/utils'
import { mapRequestSymbols } from 'state/symbols/utils'
import { fetchNext } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getTargetSymbols, getMovements } from './selectors'

const TYPE = queryTypes.MENU_MOVEMENTS
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

function getReqMovements({
  smallestMts,
  query,
  targetSymbols,
  filter,
}) {
  const params = getTimeFrame(query, smallestMts)
  params.limit = LIMIT
  params.filter = filter
  if (targetSymbols.length) {
    params.symbol = mapRequestSymbols(targetSymbols)
  }
  return makeFetchCall('getMovements', params)
}

function* fetchMovements() {
  try {
    const targetSymbols = yield select(getTargetSymbols)
    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const { result: resulto, error: erroro } = yield call(getReqMovements, {
      smallestMts: 0,
      query,
      targetSymbols,
      filter,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqMovements, {
      smallestMts: 0,
      query,
      targetSymbols,
      filter,
    })
    yield put(actions.updateMovements(result, LIMIT, PAGE_SIZE))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'movements.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'movements.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchNextMovements() {
  try {
    const {
      entries,
      offset,
      smallestMts,
      targetSymbols,
    } = yield select(getMovements)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const { result: resulto, error: erroro } = yield call(getReqMovements, {
      smallestMts,
      query,
      targetSymbols,
      filter,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqMovements, {
      smallestMts,
      query,
      targetSymbols,
      filter,
    })
    yield put(actions.updateMovements(result, LIMIT, PAGE_SIZE))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'movements.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'movements.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchMovementsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* movementsSaga() {
  yield takeLatest(types.FETCH_MOVEMENTS, fetchMovements)
  yield takeLatest(types.FETCH_NEXT_MOVEMENTS, fetchNextMovements)
  yield takeLatest(types.FETCH_FAIL, fetchMovementsFail)
}
