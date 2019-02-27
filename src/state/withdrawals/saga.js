import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { selectAuth } from 'state/auth/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit, getPageSize } from 'state/query/utils'
import { getSymbolsURL, getSymbolsFromUrlParam } from 'state/symbols/utils'

import types from './constants'
import actions from './actions'
import { getTargetSymbols, getWithdrawals } from './selectors'

const TYPE = queryTypes.MENU_MOVEMENTS
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

function getReqMovements(auth, query, targetSymbols, smallestMts) {
  const params = getTimeFrame(query, smallestMts)
  params.limit = LIMIT
  params.isWithdrawals = true
  if (targetSymbols.length > 0) {
    params.symbol = targetSymbols
  }
  return makeFetchCall('getMovements', auth, params)
}

function* fetchMovements({ payload: symbol }) {
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
    const { result = [], error } = yield call(getReqMovements, auth, query, targetSymbols, 0)
    yield put(actions.updateMovements(result, LIMIT, PAGE_SIZE))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'movements.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'movements.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchNextMovements() {
  try {
    const {
      entries,
      offset,
      smallestMts,
      targetSymbols,
    } = yield select(getWithdrawals)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqMovements, auth, query, targetSymbols, smallestMts)
    yield put(actions.updateMovements(result, LIMIT, PAGE_SIZE))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'movements.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'movements.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchMovementsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* withdrawalsSaga() {
  yield takeLatest(types.FETCH_WITHDRAWALS, fetchMovements)
  yield takeLatest(types.FETCH_NEXT_WITHDRAWALS, fetchNextMovements)
  yield takeLatest(types.FETCH_FAIL, fetchMovementsFail)
}
