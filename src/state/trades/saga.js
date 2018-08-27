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

function getTrades(auth, query, smallestMts) {
  const params = getTimeFrame(query, 'trades', smallestMts)
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
    const { result = [], error } = yield call(getTrades, auth, query, 0)
    yield put(actions.updateTrades(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'trades.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'trades.title',
      detail: JSON.stringify(fail),
    }))
  }
}

const LIMIT = queryTypes.DEFAULT_TRADES_QUERY_LIMIT

function* fetchNextTrades() {
  try {
    const trades = yield select(state => state.trades)
    const { offset, entries, smallestMts } = trades
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(state => state.query)
    const { result = [], error } = yield call(getTrades, auth, query, smallestMts)
    yield put(actions.updateTrades(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'trades.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'trades.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchTradesFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* tradesSaga() {
  yield takeLatest(types.FETCH_TRADES, fetchTrades)
  yield takeLatest(types.FETCH_NEXT_TRADES, fetchNextTrades)
  yield takeLatest(types.FETCH_FAIL, fetchTradesFail)
}
