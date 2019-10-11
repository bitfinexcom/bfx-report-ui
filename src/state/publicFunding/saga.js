import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, mapRequestSymbols, mapSymbol } from 'state/symbols/utils'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { selectAuth } from 'state/auth/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit, getPageSize } from 'state/query/utils'
import { fetchNext } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getPublicFunding, getTargetSymbol } from './selectors'

const TYPE = queryTypes.MENU_PUBLIC_FUNDING
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

function getReqPublicFunding({
  smallestMts,
  auth,
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
  return makeFetchCall('getPublicTrades', auth, params)
}

function* fetchPublicFunding({ payload: symbol }) {
  try {
    let targetSymbol = yield select(getTargetSymbol)
    // set symbol from url
    if (symbol && symbol !== targetSymbol) {
      yield put(actions.setTargetSymbol(mapSymbol(symbol)))
      targetSymbol = symbol
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const { result: resulto, error: erroro } = yield call(getReqPublicFunding, {
      smallestMts: 0,
      auth,
      query,
      targetSymbol,
      filter,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqPublicFunding, {
      smallestMts: 0,
      auth,
      query,
      targetSymbol,
      filter,
    })
    yield put(actions.updatePublicFunding(result, LIMIT, PAGE_SIZE))

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

function* fetchNextPublicFunding() {
  try {
    const {
      offset,
      entries,
      smallestMts,
      targetSymbol,
    } = yield select(getPublicFunding)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const { result: resulto, error: erroro } = yield call(getReqPublicFunding, {
      smallestMts,
      auth,
      query,
      targetSymbol,
      filter,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqPublicFunding, {
      smallestMts,
      auth,
      query,
      targetSymbol,
      filter,
    })
    yield put(actions.updatePublicFunding(result, LIMIT, PAGE_SIZE))

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

function* fetchPublicFundingFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* publicFundingSaga() {
  yield takeLatest(types.FETCH_PUBLIC_FUNDING, fetchPublicFunding)
  yield takeLatest(types.FETCH_NEXT_PUBLIC_FUNDING, fetchNextPublicFunding)
  yield takeLatest(types.FETCH_FAIL, fetchPublicFundingFail)
}
