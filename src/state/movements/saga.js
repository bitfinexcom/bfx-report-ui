import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { postJsonfetch, selectAuth } from 'state/utils'
import { getTimeFrame } from 'state/query/selector'
import statusTypes from 'state/status/constants'
import queryTypes from 'state/query/constants'
import { platform } from 'var/config'
import types from './constants'

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
    yield put({
      type: types.UPDATE_MOVEMENTS,
      payload: (data && data.result) || [],
    })

    if (data && data.error) {
      yield put({
        type: statusTypes.UPDATE_ERROR_STATUS,
        payload: `Movements fail ${JSON.stringify(data.error)}`,
      })
    }
  } catch (error) {
    yield put({
      type: statusTypes.UPDATE_ERROR_STATUS,
      payload: `Movements request fail ${JSON.stringify(error)}`,
    })
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
    yield put({
      type: types.UPDATE_MOVEMENTS,
      payload: (data && data.result) || [],
    })

    if (data && data.error) {
      yield put({
        type: statusTypes.UPDATE_ERROR_STATUS,
        payload: `Movements fail ${JSON.stringify(data.error)}`,
      })
    }
  } catch (error) {
    yield put({
      type: statusTypes.UPDATE_ERROR_STATUS,
      payload: `Movements request fail ${JSON.stringify(error)}`,
    })
  }
}

export default function* movementsSaga() {
  yield takeLatest(types.FETCH_MOVEMENTS, fetchMovements)
  yield takeLatest(types.FETCH_NEXT_MOVEMENTS, fetchNextMovements)
}
