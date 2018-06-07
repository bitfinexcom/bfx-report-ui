import { call, put, select, takeLatest } from 'redux-saga/effects'
import types from './constants'
import { postJsonfetch, selectAuth } from '../../state/utils'
import { baseUrl } from '../../var/config'

function getOrders(auth) {
  const now = (new Date()).getTime();
  // TODO: should customizable
  // const shift = 2 * 7 * 24 * 60 * 60; // 2 weeks
  const start = 0; // now - shift;
  // TODO: should customizable
  const limit = 10;
  return postJsonfetch(`${baseUrl}/get-data`, {
    auth,
    method: 'getOrders',
    params: {
      start,
      end: now,
      limit,
    },
  })
}

function* fetchOrders() {
  const auth = yield select(selectAuth)
  try {
    const data = yield call(getOrders, auth)
    yield put({
      type: types.UPDATE_ORDERS,
      payload: data && data.result,
    })
  } catch (error) {
    // TODO: handle error case
    // console.error(error)
    // yield put({ type: 'REQUEST_FAILED', error })
  }
}

export default function* ordersSaga() {
  yield takeLatest(types.FETCH_ORDERS, fetchOrders)
}
