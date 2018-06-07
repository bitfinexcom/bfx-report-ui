import { call, put, select, takeLatest } from 'redux-saga/effects'
import types from './constants'
import { postJsonfetch, selectAuth } from '../../state/utils'
import { baseUrl } from '../../var/config'

function getMovements(auth) {
  return postJsonfetch(`${baseUrl}/get-data`, {
    auth,
    method: 'getMovements',
  })
}

function* fetchMovements() {
  const auth = yield select(selectAuth)
  try {
    const data = yield call(getMovements, auth)
    yield put({
      type: types.UPDATE_MOVEMENTS,
      payload: data && data.result,
    })
  } catch (error) {
    // TODO: handle error case
    // console.error(error)
    // yield put({ type: 'REQUEST_FAILED', error })
  }
}

export default function* movementsSaga() {
  yield takeLatest(types.FETCH_MOVEMENTS, fetchMovements)
}
