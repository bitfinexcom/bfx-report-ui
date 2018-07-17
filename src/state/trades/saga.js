import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { postJsonfetch, selectAuth } from 'state/utils'
import { getTimeFrame } from 'state/query/selector'
import statusTypes from 'state/status/constants'
import { platform } from 'var/config'
import types from './constants'

function getTrades(auth, query) {
  const params = getTimeFrame(query)
  return postJsonfetch(`${platform.API_URL}/get-data`, {
    auth,
    method: 'getTrades',
    params,
  })
}

function* fetchTrades() {
  try {
    const auth = yield select(selectAuth)
    const query = yield select(state => state.query)
    const data = yield call(getTrades, auth, query)
    yield put({
      type: types.UPDATE_TRADES,
      payload: (data && data.result) || [],
    })

    if (data && data.error) {
      yield put({
        type: statusTypes.UPDATE_ERROR_STATUS,
        payload: `Trades fail ${JSON.stringify(data.error)}`,
      })
    }
  } catch (error) {
    yield put({
      type: statusTypes.UPDATE_ERROR_STATUS,
      payload: `Trades request fail ${JSON.stringify(error)}`,
    })
  }
}

export default function* tradesSaga() {
  yield takeLatest(types.FETCH_TRADES, fetchTrades)
}
