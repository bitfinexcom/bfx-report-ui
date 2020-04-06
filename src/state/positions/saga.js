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
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import { getPaginationData } from 'state/pagination/selectors'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit } from 'state/query/utils'
import { fetchDataWithPagination } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getPositions } from './selectors'
import { getTimeFrame } from '../timeRange/selectors'

const TYPE = queryTypes.MENU_POSITIONS
const LIMIT = getQueryLimit(TYPE)

function getReqPositions({
  start,
  end,
  targetPairs,
  filter,
}) {
  const params = {
    start,
    end,
    limit: LIMIT,
    filter,
    symbol: targetPairs.length ? formatRawSymbols(mapRequestPairs(targetPairs)) : undefined,
  }
  return makeFetchCall('getPositionsHistory', params)
}

function* fetchPositions() {
  try {
    const { targetPairs } = yield select(getPositions)
    const filter = yield select(getFilterQuery, TYPE)
    const { smallestMts } = yield select(getPaginationData, TYPE)
    const { start, end } = yield select(getTimeFrame, smallestMts)
    const { result, error } = yield call(fetchDataWithPagination, getReqPositions, {
      start,
      end,
      targetPairs,
      filter,
    })
    yield put(actions.updatePositions(result))
    yield put(updatePagination(TYPE, result))

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
  yield takeLatest([types.REFRESH, types.ADD_PAIR, types.REMOVE_PAIR], refreshPositions)
  yield takeLatest(types.FETCH_FAIL, fetchPositionsFail)
}
