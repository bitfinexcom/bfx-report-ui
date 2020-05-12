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
import { getFundingLoanHistory } from './selectors'

const TYPE = queryTypes.MENU_FLOAN
const LIMIT = getQueryLimit(TYPE)

function getReqFLoan({
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
  return makeFetchCall('getFundingLoanHistory', params)
}

function* fetchFLoan() {
  try {
    const { targetSymbols } = yield select(getFundingLoanHistory)
    const { smallestMts } = yield select(getPaginationData, TYPE)
    const { start, end } = yield select(getTimeFrame, smallestMts)
    const filter = yield select(getFilterQuery, TYPE)
    const { result, error } = yield call(fetchDataWithPagination, getReqFLoan, {
      start,
      end,
      targetSymbols,
      filter,
    })
    yield put(actions.updateFLoan(result))
    yield put(updatePagination(TYPE, result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'floan.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'floan.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshFLoan() {
  yield put(refreshPagination(TYPE))
}

function* fetchFLoanFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* fundingLoanHistorySaga() {
  yield takeLatest(types.FETCH_FLOAN, fetchFLoan)
  yield takeLatest([types.REFRESH, types.ADD_SYMBOL, types.REMOVE_SYMBOL], refreshFLoan)
  yield takeLatest(types.FETCH_FAIL, fetchFLoanFail)
}
