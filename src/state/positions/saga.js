// Return the positions of a user between two dates
// https://docs.bitfinex.com/v2/reference#rest-auth-positions
import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawPairToTPair, getSymbolsURL, getPairsFromUrlParam } from 'state/symbols/utils'
import { selectAuth } from 'state/auth/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit } from 'state/query/utils'

import types from './constants'
import actions from './actions'
import { getPositions, getTargetPairs } from './selectors'

const TYPE = queryTypes.MENU_POSITIONS
const LIMIT = getQueryLimit(TYPE)

function getReqPositions(auth, query, targetPairs, smallestMts) {
  const params = getTimeFrame(query, TYPE, smallestMts)
  if (targetPairs.length > 0) {
    params.symbol = formatRawPairToTPair(targetPairs)
  }
  return makeFetchCall('getPositionsHistory', auth, params)
}

function* fetchPositions({ payload: pair }) {
  try {
    let targetPairs = yield select(getTargetPairs)
    const pairsUrl = getSymbolsURL(targetPairs)
    // set pair from url
    if (pair && pair !== pairsUrl) {
      targetPairs = getPairsFromUrlParam(pair)
      yield put(actions.setTargetPairs(targetPairs))
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqPositions, auth, query, targetPairs, 0)
    yield put(actions.updatePositions(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'positions.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'positions.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchNextPositions() {
  try {
    const {
      offset,
      entries,
      smallestMts,
      targetPairs,
    } = yield select(getPositions)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqPositions, auth, query, targetPairs, smallestMts)
    yield put(actions.updatePositions(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'positions.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'positions.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchPositionsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* positionsSaga() {
  yield takeLatest(types.FETCH_POSITIONS, fetchPositions)
  yield takeLatest(types.FETCH_NEXT_POSITIONS, fetchNextPositions)
  yield takeLatest(types.FETCH_FAIL, fetchPositionsFail)
}
