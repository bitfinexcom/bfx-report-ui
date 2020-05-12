import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, mapRequestSymbols } from 'state/symbols/utils'
import { getTimeFrame } from 'state/timeRange/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getPaginationData } from 'state/pagination/selectors'
import queryTypes from 'state/query/constants'
import { getQueryLimit } from 'state/query/utils'
import { fetchDataWithPagination } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getFundingCreditHistory } from './selectors'

const TYPE = queryTypes.MENU_FCREDIT
const LIMIT = getQueryLimit(TYPE)

function getReqFCredit({
  start,
  end,
  targetSymbols,
  filter,
}) {
  const params = {
    start,
    end,
    limit: LIMIT,
    filter,
    symbol: formatRawSymbols(mapRequestSymbols(targetSymbols)),
  }
  return makeFetchCall('getFundingCreditHistory', params)
}

function* fetchFCredit() {
  try {
    const { targetSymbols } = yield select(getFundingCreditHistory)
    const { smallestMts } = yield select(getPaginationData, TYPE)
    const { start, end } = yield select(getTimeFrame, smallestMts)
    const filter = yield select(getFilterQuery, TYPE)
    const { result, error } = yield call(fetchDataWithPagination, getReqFCredit, {
      start,
      end,
      targetSymbols,
      filter,
    })
    yield put(actions.updateFCredit(result))
    yield put(updatePagination(TYPE, result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'fcredit.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'fcredit.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshFCredit() {
  yield put(refreshPagination(TYPE))
}

function* fetchFCreditFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* fundingCreditHistorySaga() {
  yield takeLatest(types.FETCH_FCREDIT, fetchFCredit)
  yield takeLatest([types.REFRESH, types.ADD_SYMBOL, types.REMOVE_SYMBOL], refreshFCredit)
  yield takeLatest(types.FETCH_FAIL, fetchFCreditFail)
}
