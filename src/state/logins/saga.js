import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { getTargetQueryLimit } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getFilterQuery } from 'state/filters/selectors'
import { getPaginationData } from 'state/pagination/selectors'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { fetchDataWithPagination } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getParams } from './selectors'

const TYPE = queryTypes.MENU_LOGINS

function getReqLogins({
  start,
  end,
  queryLimit,
  filter,
}) {
  const params = {
    start,
    end,
    filter,
    limit: queryLimit,
  }
  return makeFetchCall('getLogins', params)
}

/* eslint-disable-next-line consistent-return */
function* fetchLogins({ payload = {} }) {
  const { nextFetch } = payload
  try {
    const filter = yield select(getFilterQuery, TYPE)
    const queryLimit = yield select(getTargetQueryLimit, TYPE)
    const { start, end } = yield select(getParams)
    const { nextPage } = yield select(getPaginationData, TYPE)

    const { result, error } = yield call(fetchDataWithPagination, getReqLogins, {
      start,
      end: nextFetch ? nextPage : end,
      filter,
      queryLimit,
    })
    yield put(actions.updateData(result))
    yield put(updatePagination(TYPE, result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'logins.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'logins.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshLogins() {
  yield put(refreshPagination(TYPE))
}

function* fetchLoginsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* loginsSaga() {
  yield takeLatest(types.FETCH, fetchLogins)
  yield takeLatest(types.REFRESH, refreshLogins)
  yield takeLatest(types.FETCH_FAIL, fetchLoginsFail)
}
