import { call, put, select, takeLatest } from 'redux-saga/effects'
import { getTimeFrame, postJsonfetch, selectAuth } from 'state/utils'
import statusTypes from 'state/status/constants'
import { platform } from 'var/config'
import types from './constants'

function getTrades(auth) {
  const { start, end, limit } = getTimeFrame()
  return postJsonfetch(`${platform.API_URL}/get-data`, {
    auth,
    method: 'getTrades',
    params: {
      start,
      end,
      limit,
    },
  })
}

function* fetchTrades() {
  const auth = yield select(selectAuth)
  try {
    const data = yield call(getTrades, auth)
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
