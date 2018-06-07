import { call, put, select, takeLatest } from 'redux-saga/effects'
import types from './constants'
import { postJsonfetch, selectAuth } from '../../state/utils'
import { baseUrl } from '../../var/config'

function getTrades(auth) {
  const now = (new Date()).getTime();
  // TODO: should customizable
  // const shift = 2 * 7 * 24 * 60 * 60; // 2 weeks
  const start = 0; //now - shift;
  // TODO: should customizable
  const limit = 10;
  console.warn(start, ' / ', now)
  return postJsonfetch(`${baseUrl}/get-data`, {
    auth,
    method: 'getTrades',
    params: {
      start,
      end: now,
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
      payload: data && data.result,
    })
  } catch (error) {
    // TODO: handle error case
    // console.error(error)
    // yield put({ type: 'REQUEST_FAILED', error })
  }
}

export default function* tradesSaga() {
  yield takeLatest(types.FETCH_TRADES, fetchTrades)
}
