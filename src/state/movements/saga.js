import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { selectAuth } from 'state/auth/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'

import types from './constants'
import actions from './actions'
import { getTargetSymbol, getMovements } from './selectors'

function getReqMovements(auth, query, targetSymbol, smallestMts) {
  const params = getTimeFrame(query, queryTypes.MENU_MOVEMENTS, smallestMts)
  if (targetSymbol) {
    params.symbol = targetSymbol
  }
  return makeFetchCall('getMovements', auth, params)
}

function* fetchMovements() {
  try {
    const targetSymbol = yield select(getTargetSymbol)
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqMovements, auth, query, targetSymbol, 0)
    yield put(actions.updateMovements(result))

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

const LIMIT = queryTypes.DEFAULT_MOVEMENTS_QUERY_LIMIT

function* fetchNextMovements() {
  try {
    const {
      entries,
      offset,
      smallestMts,
      targetSymbol,
    } = yield select(getMovements)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqMovements, auth, query, targetSymbol, smallestMts)
    yield put(actions.updateMovements(result))

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
