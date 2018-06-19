import { call, put, select, takeLatest } from 'redux-saga/effects'
import { getTimeFrame, postJsonfetch, selectAuth } from 'state/utils'
import statusTypes from 'state/status/constants'
import { platform } from 'var/config'
import types from './constants'

function getMovements(auth) {
  const { start, end, limit } = getTimeFrame()
  return postJsonfetch(`${platform.API_URL}/get-data`, {
    auth,
    method: 'getMovements',
    params: {
      start,
      end,
      limit,
    },
  })
}

function* fetchMovements() {
  const auth = yield select(selectAuth)
  try {
    const data = yield call(getMovements, auth)
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
}
