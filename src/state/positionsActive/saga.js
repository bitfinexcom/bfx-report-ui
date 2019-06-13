// Return the active positions of a user between two dates
import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { selectAuth } from 'state/auth/selectors'
import { getQuery } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit, getPageSize } from 'state/query/utils'

import types from './constants'
import actions from './actions'
import { getActivePositions } from './selectors'

const TYPE = queryTypes.MENU_POSITIONS_ACTIVE
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

function getReqPositions({ auth }) {
  return makeFetchCall('getActivePositions', auth)
}

function* fetchPositions() {
  try {
    const auth = yield select(selectAuth)
    const { result, error } = yield call(getReqPositions, { auth })
    yield put(actions.updateAPositions(result, LIMIT, PAGE_SIZE))
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
    } = yield select(getActivePositions)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result, error } = yield call(getReqPositions, {
      smallestMts,
      auth,
      query,
      targetPairs,
    })
    yield put(actions.updateAPositions(result, LIMIT, PAGE_SIZE))

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

export default function* positionsActiveSaga() {
  yield takeLatest(types.FETCH_APOSITIONS, fetchPositions)
  yield takeLatest(types.FETCH_NEXT_APOSITIONS, fetchNextPositions)
  yield takeLatest(types.FETCH_FAIL, fetchPositionsFail)
}
