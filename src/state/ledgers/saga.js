import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { getQuery, getTargetQueryLimit, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import {
  getSymbolsURL, getSymbolsFromUrlParam, mapSymbol, mapRequestSymbols,
} from 'state/symbols/utils'
import { getFilterQuery } from 'state/filters/selectors'
import { getPageSize } from 'state/query/utils'
import { fetchNext } from 'state/sagas.helper'
import { frameworkCheck } from 'state/ui/saga'

import types from './constants'
import actions from './actions'
import { getTargetSymbols, getLedgers } from './selectors'

const TYPE = queryTypes.MENU_LEDGERS
const PAGE_SIZE = getPageSize(TYPE)

function getReqLedgers({
  smallestMts,
  query,
  targetSymbols,
  queryLimit,
  filter,
}) {
  const params = getTimeFrame(query, smallestMts)
  params.filter = filter
  if (targetSymbols.length) {
    params.symbol = mapRequestSymbols(targetSymbols)
  }
  if (queryLimit) {
    params.limit = queryLimit
  }
  return makeFetchCall('getLedgers', params)
}

/* eslint-disable-next-line consistent-return */
function* fetchLedgers({ payload: symbol }) {
  try {
    const shouldProceed = yield call(frameworkCheck)
    if (!shouldProceed) {
      // stop loading for first request
      return yield put(actions.updateLedgers())
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
    yield put(actions.updateLedgers(result, queryLimit, PAGE_SIZE))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'ledgers.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'ledgers.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchNextLedgers() {
  try {
    const {
      entries,
      offset,
      smallestMts,
      targetSymbols,
    } = yield select(getLedgers)
    const filter = yield select(getFilterQuery, TYPE)
    const getQueryLimit = yield select(getTargetQueryLimit)
    const queryLimit = getQueryLimit(TYPE)
    // data exist, no need to fetch again
    if (entries.length - queryLimit >= offset) {
      return
    }
    const query = yield select(getQuery)
    const { result: resulto = {}, error: erroro } = yield call(getReqLedgers, {
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
    yield put(actions.updateLedgers(result, queryLimit, PAGE_SIZE))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'ledgers.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'ledgers.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchLedgersFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* ledgersSaga() {
  yield takeLatest(types.FETCH_LEDGERS, fetchLedgers)
  yield takeLatest(types.FETCH_NEXT_LEDGERS, fetchNextLedgers)
  yield takeLatest(types.FETCH_FAIL, fetchLedgersFail)
}
