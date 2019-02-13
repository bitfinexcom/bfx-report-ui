import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { selectAuth } from 'state/auth/selectors'
import { getQuery, getTargetQueryLimit, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getSymbolsURL, getSymbolsFromUrlParam } from 'state/symbols/utils'
import { getPageSize } from 'state/query/utils'

import types from './constants'
import actions from './actions'
import { getTargetSymbols, getLedgers } from './selectors'

const TYPE = queryTypes.MENU_LEDGERS
const PAGE_SIZE = getPageSize(TYPE)

function getReqLedgers(auth, query, targetSymbols, smallestMts, queryLimit) {
  const params = getTimeFrame(query, smallestMts)
  if (targetSymbols.length > 0) {
    params.symbol = targetSymbols
  }
  if (queryLimit) {
    params.limit = queryLimit
  }
  return makeFetchCall('getLedgers', auth, params)
}

function* fetchLedgers({ payload: symbol }) {
  try {
    let targetSymbols = yield select(getTargetSymbols)
    const symbolsUrl = getSymbolsURL(targetSymbols)
    // set symbol from url
    if (symbol && symbol !== symbolsUrl) {
      targetSymbols = getSymbolsFromUrlParam(symbol)
      yield put(actions.setTargetSymbols(targetSymbols))
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const getQueryLimit = yield select(getTargetQueryLimit)
    const queryLimit = getQueryLimit(TYPE)
    const { result = [], error } = yield call(getReqLedgers, auth, query, targetSymbols, 0, queryLimit)
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
    const getQueryLimit = yield select(getTargetQueryLimit)
    const queryLimit = getQueryLimit(TYPE)
    // data exist, no need to fetch again
    if (entries.length - queryLimit >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqLedgers, auth, query, targetSymbols, smallestMts, queryLimit)
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
