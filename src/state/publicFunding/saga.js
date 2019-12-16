import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, mapRequestSymbols } from 'state/symbols/utils'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getPaginationData } from 'state/pagination/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit } from 'state/query/utils'
import { fetchNext } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getPublicFunding } from './selectors'

const TYPE = queryTypes.MENU_PUBLIC_FUNDING
const LIMIT = getQueryLimit(TYPE)

function getReqPublicFunding({
  smallestMts,
  query,
  targetSymbol,
  filter,
}) {
  const params = getTimeFrame(query, smallestMts)
  params.limit = LIMIT
  params.filter = filter
  if (targetSymbol) {
    params.symbol = formatRawSymbols(mapRequestSymbols(targetSymbol, true))
  }
  return makeFetchCall('getPublicTrades', params)
}

function* fetchPublicFunding({ payload }) {
  const { nextFetch = false } = payload
  try {
    const { entries, targetSymbol } = yield select(getPublicFunding)
    const { offset, smallestMts } = yield select(getPaginationData, TYPE)
    // data exist, no need to fetch again
    if (nextFetch && entries.length - LIMIT >= offset) {
      return
    }
    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const { result: resulto, error: erroro } = yield call(getReqPublicFunding, {
      smallestMts,
      query,
      targetSymbol,
      filter,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqPublicFunding, {
      smallestMts,
      query,
      targetSymbol,
      filter,
    })
    yield put(actions.updatePublicFunding(result))
    yield put(updatePagination(TYPE, result, LIMIT))

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
  yield takeLatest(types.REFRESH, refreshPublicFunding)
  yield takeLatest(types.FETCH_FAIL, fetchPublicFundingFail)
}
