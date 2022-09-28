import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { getTimeFrame } from 'state/timeRange/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getPaginationData } from 'state/pagination/selectors'
import queryTypes from 'state/query/constants'
import { getQueryLimit } from 'state/query/utils'
import { mapRequestSymbols } from 'state/symbols/utils'
import { fetchDataWithPagination } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getMovements } from './selectors'

const TYPE = queryTypes.MENU_MOVEMENTS
const LIMIT = getQueryLimit(TYPE)

function getReqMovements({
  start,
  end,
  targetSymbols,
  filter,
}) {
  const params = {
    start,
    end,
    limit: LIMIT,
    filter,
    symbol: targetSymbols.length ? mapRequestSymbols(targetSymbols) : undefined,
  }
  return makeFetchCall('getMovements', params)
}

function* fetchMovements() {
  try {
    const { targetSymbols } = yield select(getMovements)
    const { smallestMts } = yield select(getPaginationData, TYPE)
    const { start, end } = yield select(getTimeFrame, smallestMts)
    const filter = yield select(getFilterQuery, TYPE)
    const { result, error } = yield call(fetchDataWithPagination, getReqMovements, {
      start,
      end,
      targetSymbols,
      filter,
    })
    yield put(actions.updateMovements(result))
    yield put(updatePagination(TYPE, result))

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
  yield takeLatest([types.REFRESH, types.ADD_SYMBOL, types.REMOVE_SYMBOL, types.CLEAR_SYMBOLS], refreshMovements)
  yield takeLatest(types.FETCH_FAIL, fetchMovementsFail)
}
