import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawPairToTPair } from 'state/symbols/utils'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { selectAuth } from 'state/auth/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'

import types from './constants'
import actions from './actions'
import { getPublicTrades, getTargetPair } from './selectors'

function getReqPublicTrades(auth, query, targetPair, smallestMts) {
  const params = getTimeFrame(query, 'public_trades', smallestMts)
  if (targetPair) {
    params.symbol = formatRawPairToTPair(targetPair)
  }
  return makeFetchCall('getPublicTrades', auth, params)
}

function* fetchPublicTrades() {
  try {
    const targetPair = yield select(getTargetPair)
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqPublicTrades, auth, query, targetPair, 0)
    yield put(actions.updatePublicTrades(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'publictrades.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'publictrades.title',
      detail: JSON.stringify(fail),
    }))
  }
}

const LIMIT = queryTypes.DEFAULT_PUBLIC_TRADES_QUERY_LIMIT

function* fetchNextPublicTrades() {
  try {
    const {
      offset,
      entries,
      smallestMts,
      targetPair,
    } = yield select(getPublicTrades)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqPublicTrades, auth, query, targetPair, smallestMts)
    yield put(actions.updateTrades(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'publictrades.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'publictrades.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchPublicTradesFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* publicTradesSaga() {
  yield takeLatest(types.FETCH_PUBLIC_TRADES, fetchPublicTrades)
  yield takeLatest(types.FETCH_NEXT_PUBLIC_TRADES, fetchNextPublicTrades)
  yield takeLatest(types.FETCH_FAIL, fetchPublicTradesFail)
}
