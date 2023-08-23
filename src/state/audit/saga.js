// Return the positions of a user between two dates
// https://docs.bitfinex.com/v2/reference#rest-auth-positions
import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { getTimeFrame } from 'state/timeRange/selectors'
import { updateErrorStatus } from 'state/status/actions'
import { getPaginationData } from 'state/pagination/selectors'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit } from 'state/query/utils'
import { fetchDataWithPagination } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getPositionsAudit } from './selectors'

const TYPE = queryTypes.MENU_POSITIONS_AUDIT
const LIMIT = getQueryLimit(TYPE)

function getReqPositionsAudit({
  start,
  end,
  targetIds,
}) {
  const params = {
    start,
    end,
    limit: LIMIT,
  }
  if (targetIds) {
    params.id = targetIds.map(id => parseInt(id, 10))
    return makeFetchCall('getPositionsAudit', params)
  }
  return new Promise((_, reject) => reject(new Error('no id specified')))
}

function* fetchPositionsAudit() {
  try {
    const { targetIds } = yield select(getPositionsAudit)
    const { smallestMts } = yield select(getPaginationData, TYPE)
    const { start, end } = yield select(getTimeFrame, smallestMts)
    const { result, error } = yield call(fetchDataWithPagination, getReqPositionsAudit, {
      start,
      end,
      targetIds,
    })
    yield put(actions.updatePAudit(result))
    yield put(updatePagination(TYPE, result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'paudit.title',
        detail: error?.message ?? JSON.stringify(error),
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

function* refreshPositionsAudit() {
  yield put(refreshPagination(TYPE))
}

function* fetchPositionsAuditFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* positionsAuditSaga() {
  yield takeLatest(types.FETCH_PAUDIT, fetchPositionsAudit)
  yield takeLatest([types.REFRESH, types.SET_IDS, types.ADD_ID, types.REMOVE_ID], refreshPositionsAudit)
  yield takeLatest(types.FETCH_FAIL, fetchPositionsAuditFail)
}
