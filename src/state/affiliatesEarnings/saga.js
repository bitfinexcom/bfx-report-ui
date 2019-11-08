import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { getQuery, getTargetQueryLimit, getTimeFrame } from 'state/query/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import {
  getSymbolsURL, getSymbolsFromUrlParam, mapRequestSymbols, mapSymbol,
} from 'state/symbols/utils'
import { getPageSize } from 'state/query/utils'
import { frameworkCheck } from 'state/ui/saga'
import { fetchNext } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getTargetSymbols, getAffiliatesEarnings } from './selectors'

const TYPE = queryTypes.MENU_AFFILIATES_EARNINGS
const PAGE_SIZE = getPageSize(TYPE)

function getReqLedgers({
  smallestMts,
  query,
  targetSymbols,
  filter,
  queryLimit,
}) {
  const params = getTimeFrame(query, smallestMts)
  params.filter = filter
  if (targetSymbols.length) {
    params.symbol = mapRequestSymbols(targetSymbols)
  }
  if (queryLimit) {
    params.limit = queryLimit
  }
  // Affiliates Earnings specific param
  params.isAffiliateRebate = true
  return makeFetchCall('getLedgers', params)
}

/* eslint-disable-next-line consistent-return */
function* fetchAffiliatesEarnings({ payload: symbol }) {
  try {
    const shouldProceed = yield call(frameworkCheck)
    if (!shouldProceed) {
      // stop loading for first request
      return yield put(actions.updateAffiliatesEarnings())
    }

    let targetSymbols = yield select(getTargetSymbols)
    const symbolsUrl = getSymbolsURL(targetSymbols)
    // set symbol from url
    if (symbol && symbol !== symbolsUrl) {
      targetSymbols = getSymbolsFromUrlParam(symbol).map(mapSymbol)
      yield put(actions.setTargetSymbols(targetSymbols))
    }
    const query = yield select(getQuery)
    const getQueryLimit = yield select(getTargetQueryLimit)
    const filter = yield select(getFilterQuery, TYPE)
    const queryLimit = getQueryLimit(TYPE)
    const { result: resulto, error: erroro } = yield call(getReqLedgers, {
      smallestMts: 0,
      query,
      targetSymbols,
      filter,
      queryLimit,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqLedgers, {
      smallestMts: 0,
      query,
      targetSymbols,
      filter,
      queryLimit,
    })
    yield put(actions.updateAffiliatesEarnings(result, queryLimit, PAGE_SIZE))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'affiliatesearnings.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'affiliatesearnings.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchNextAffiliatesEarnings() {
  try {
    const {
      entries,
      offset,
      smallestMts,
      targetSymbols,
    } = yield select(getAffiliatesEarnings)
    const filter = yield select(getFilterQuery, TYPE)
    const getQueryLimit = yield select(getTargetQueryLimit)
    const queryLimit = getQueryLimit(TYPE)
    // data exist, no need to fetch again
    if (entries.length - queryLimit >= offset) {
      return
    }
    const query = yield select(getQuery)
    const { result: resulto, error: erroro } = yield call(getReqLedgers, {
      smallestMts,
      query,
      targetSymbols,
      filter,
      queryLimit,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqLedgers, {
      smallestMts,
      query,
      targetSymbols,
      filter,
      queryLimit,
    })
    yield put(actions.updateAffiliatesEarnings(result, queryLimit, PAGE_SIZE))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'affiliatesearnings.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'affiliatesearnings.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchAffiliatesEarningsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* affiliatesEarningsSaga() {
  yield takeLatest(types.FETCH_AFFILIATES_EARNINGS, fetchAffiliatesEarnings)
  yield takeLatest(types.FETCH_NEXT_AFFILIATES_EARNINGS, fetchNextAffiliatesEarnings)
  yield takeLatest(types.FETCH_FAIL, fetchAffiliatesEarningsFail)
}
