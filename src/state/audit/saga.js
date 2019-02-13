// Return the positions of a user between two dates
// https://docs.bitfinex.com/v2/reference#rest-auth-positions
import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { selectAuth } from 'state/auth/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit, getPageSize } from 'state/query/utils'

import types from './constants'
import actions from './actions'
import { getPositionsAudit, getTargetIds } from './selectors'

const TYPE = queryTypes.MENU_POSITIONS_AUDIT
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

function getReqPositionsAudit(auth, query, targetIds, smallestMts) {
  const params = getTimeFrame(query, smallestMts)
  params.limit = LIMIT
  if (targetIds) {
    params.id = targetIds.map(id => parseInt(id, 10))
    return makeFetchCall('getPositionsAudit', auth, params)
  }
  return new Promise((_, reject) => reject(new Error('no id specified')))
}

function* fetchPositionsAudit({ payload: ids }) {
  try {
    let targetIds = yield select(getTargetIds)
    const idsUrl = targetIds.join(',')
    // set id from url
    if (ids && ids !== idsUrl) {
      if (Number(ids)) {
        targetIds = [parseInt(ids, 10)]
      }
      if (ids.indexOf(',')) {
        targetIds = ids.split(',').map(id => parseInt(id, 10))
      }
      yield put(actions.setTargetIds(targetIds))
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqPositionsAudit, auth, query, targetIds, 0)
    yield put(actions.updatePAudit(result, LIMIT, PAGE_SIZE))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'paudit.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'paudit.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchNextPositionsAudit() {
  try {
    const {
      offset,
      entries,
      smallestMts,
      targetIds,
    } = yield select(getPositionsAudit)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqPositionsAudit, auth, query, targetIds, smallestMts)
    yield put(actions.updatePAudit(result, LIMIT, PAGE_SIZE))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'paudit.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'paudit.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchPositionsAuditFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* positionsAuditSaga() {
  yield takeLatest(types.FETCH_PAUDIT, fetchPositionsAudit)
  yield takeLatest(types.FETCH_NEXT_PAUDIT, fetchNextPositionsAudit)
  yield takeLatest(types.FETCH_FAIL, fetchPositionsAuditFail)
}
