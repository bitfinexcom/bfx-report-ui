import { call, put, select, takeLatest } from 'redux-saga/effects'
import { postJsonfetch, selectAuth } from 'state/utils'
import { getTimeFrame } from 'state/query/selector'
import statusTypes from 'state/status/constants'
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

    if (data && data.error) {
      yield put({
        type: statusTypes.UPDATE_ERROR_STATUS,
        payload: `Orders fail ${JSON.stringify(data.error)}`,
      })
    }
  } catch (error) {
    yield put({
      type: statusTypes.UPDATE_ERROR_STATUS,
      payload: `Orders request fail ${JSON.stringify(error)}`,
    })
  }
}

export default function* ordersSaga() {
  yield takeLatest(types.FETCH_ORDERS, fetchOrders)
}
