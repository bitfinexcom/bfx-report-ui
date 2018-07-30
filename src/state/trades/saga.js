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
    const data = yield call(getTrades, auth, query, 0)
    const { result = [], error } = data
    yield put(actions.updateTrades(result))

    if (error) {
      yield put(updateErrorStatus(`Trades fail ${JSON.stringify(error)}`))
    }
  } catch (fail) {
    yield put(updateErrorStatus(`Trades request fail ${JSON.stringify(fail)}`))
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
    const data = yield call(getTrades, auth, query, smallestMts)
    const { result = [], error } = data
    yield put(actions.updateTrades(result))

    if (error) {
      yield put(updateErrorStatus(`Trades fail ${JSON.stringify(error)}`))
    }
  } catch (fail) {
    yield put(updateErrorStatus(`Trades request fail ${JSON.stringify(fail)}`))
  }
}

export default function* tradesSaga() {
  yield takeLatest(types.FETCH_TRADES, fetchTrades)
  yield takeLatest(types.FETCH_NEXT_TRADES, fetchNextTrades)
}
