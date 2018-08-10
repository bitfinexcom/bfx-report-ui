import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { postJsonfetch, selectAuth } from 'state/utils'
import { getTimeFrame } from 'state/query/selector'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { platform } from 'var/config'

import types from './constants'
import actions from './actions'

function getMovements(auth, query, smallestMts) {
  const params = getTimeFrame(query, 'movements', smallestMts)
  return postJsonfetch(`${platform.API_URL}/get-data`, {
    auth,
    method: 'getMovements',
    params,
  })
}

function* fetchMovements() {
  try {
    const auth = yield select(selectAuth)
    const query = yield select(state => state.query)
    const data = yield call(getMovements, auth, query, 0)
    const { result = [], error } = data
    yield put(actions.updateMovements(result))

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'movements.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateErrorStatus({
      id: 'status.request.error',
      topic: 'movements.title',
      detail: JSON.stringify(fail),
    }))
  }
}

const LIMIT = queryTypes.DEFAULT_MOVEMENTS_QUERY_LIMIT

function* fetchNextMovements() {
  try {
    const movements = yield select(state => state.movements)
    const { offset, entries, smallestMts } = movements
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(state => state.query)
    const data = yield call(getMovements, auth, query, smallestMts)
    const { result = [], error } = data
    yield put(actions.updateMovements(result))

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'movements.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateErrorStatus({
      id: 'status.request.error',
      topic: 'movements.title',
      detail: JSON.stringify(fail),
    }))
  }
}

export default function* movementsSaga() {
  yield takeLatest(types.FETCH_MOVEMENTS, fetchMovements)
  yield takeLatest(types.FETCH_NEXT_MOVEMENTS, fetchNextMovements)
}
