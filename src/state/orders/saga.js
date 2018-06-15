import { call, put, select, takeLatest } from 'redux-saga/effects'
import { getTimeFrame, postJsonfetch, selectAuth } from 'state/utils'
import { platform } from 'var/config'
import types from './constants'

function getOrders(auth) {
  const { start, end, limit } = getTimeFrame()
  return postJsonfetch(`${platform.API_URL}/get-data`, {
    auth,
    method: 'getOrders',
    params: {
      start,
      end,
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
      payload: (data && data.result) || [],
    })
  } catch (error) {
    // TODO: handle error case
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

export default function* ordersSaga() {
  yield takeLatest(types.FETCH_ORDERS, fetchOrders)
}
