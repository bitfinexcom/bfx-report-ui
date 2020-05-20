import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, mapRequestSymbols } from 'state/symbols/utils'
import { getTimeFrame } from 'state/timeRange/selectors'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getPaginationData } from 'state/pagination/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit } from 'state/query/utils'
import { fetchDataWithPagination } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getPublicFunding } from './selectors'

const TYPE = queryTypes.MENU_PUBLIC_FUNDING
const LIMIT = getQueryLimit(TYPE)

function getReqPublicFunding({
  start,
  end,
  targetSymbol,
  filter,
}) {
  const params = {
    start,
    end,
    limit: LIMIT,
    filter,
    symbol: formatRawSymbols(mapRequestSymbols(targetSymbol, true)),
  }
  return makeFetchCall('getPublicTrades', params)
}

function* fetchPublicFunding() {
  try {
    const { targetSymbol } = yield select(getPublicFunding)
    const { smallestMts } = yield select(getPaginationData, TYPE)
    const { start, end } = yield select(getTimeFrame, smallestMts)
    const filter = yield select(getFilterQuery, TYPE)
    const { result, error } = yield call(fetchDataWithPagination, getReqPublicFunding, {
      start,
      end,
      targetSymbol,
      filter,
    })
    yield put(actions.updatePublicFunding(result))
    yield put(updatePagination(TYPE, result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'publicfunding.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'publicfunding.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshPublicFunding() {
  yield put(refreshPagination(TYPE))
}

function* fetchPublicFundingFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* publicFundingSaga() {
  yield takeLatest(types.FETCH_PUBLIC_FUNDING, fetchPublicFunding)
  yield takeLatest([types.REFRESH, types.SET_SYMBOL], refreshPublicFunding)
  yield takeLatest(types.FETCH_FAIL, fetchPublicFundingFail)
}
