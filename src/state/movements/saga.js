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
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getPaginationData } from 'state/pagination/selectors'
import queryTypes from 'state/query/constants'
import { getQueryLimit } from 'state/query/utils'
import { mapRequestSymbols } from 'state/symbols/utils'
import { fetchNext } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getMovements } from './selectors'

const TYPE = queryTypes.MENU_MOVEMENTS
const LIMIT = getQueryLimit(TYPE)

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

function* fetchMovements({ payload }) {
  const { nextFetch = false } = payload
  try {
    const { entries, targetSymbols } = yield select(getMovements)
    const { offset, smallestMts } = yield select(getPaginationData, TYPE)
    const query = yield select(getQuery)

    // data exist, no need to fetch again
    if (nextFetch && entries.length - LIMIT >= offset) {
      return
    }

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
    yield put(actions.updateMovements(result))
    yield put(updatePagination(TYPE, result, LIMIT))

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

function* refreshMovements() {
  yield put(refreshPagination(TYPE))
}

function* fetchMovementsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* movementsSaga() {
  yield takeLatest(types.FETCH_MOVEMENTS, fetchMovements)
  yield takeLatest(types.REFRESH, refreshMovements)
  yield takeLatest(types.FETCH_FAIL, fetchMovementsFail)
}
