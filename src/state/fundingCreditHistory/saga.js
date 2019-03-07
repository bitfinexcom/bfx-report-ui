import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, getSymbolsURL, getSymbolsFromUrlParam } from 'state/symbols/utils'
import { selectAuth } from 'state/auth/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit, getPageSize } from 'state/query/utils'
import { fetchNext } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getTargetSymbols, getFundingCreditHistory } from './selectors'

const TYPE = queryTypes.MENU_FCREDIT
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

// make sure the first params is the `smallestMts` to be processed by fetchNext helper
function getReqFCredit(smallestMts, auth, query, targetSymbols) {
  const params = getTimeFrame(query, smallestMts)
  params.limit = LIMIT
  if (targetSymbols.length > 0) {
    params.symbol = formatRawSymbols(targetSymbols)
  }
  return makeFetchCall('getFundingCreditHistory', auth, params)
}

function* fetchFCredit({ payload: symbol }) {
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
    const { result: resulto, error: erroro } = yield call(getReqFCredit, 0, auth, query, targetSymbols)
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqFCredit, 0, auth, query, targetSymbols)
    yield put(actions.updateFCredit(result, LIMIT, PAGE_SIZE))

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

function* fetchNextFCredit() {
  try {
    const {
      offset,
      entries,
      smallestMts,
      targetSymbols,
    } = yield select(getFundingCreditHistory)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result: resulto, error: erroro } = yield call(getReqFCredit, smallestMts, auth, query, targetSymbols)
    const { result = {}, error } = yield call(
      fetchNext, resulto, erroro, getReqFCredit, smallestMts, auth, query, targetSymbols,
    )
    yield put(actions.updateFCredit(result, LIMIT, PAGE_SIZE))

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

function* fetchFCreditFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* ordersSaga() {
  yield takeLatest(types.FETCH_FCREDIT, fetchFCredit)
  yield takeLatest(types.FETCH_NEXT_FCREDIT, fetchNextFCredit)
  yield takeLatest(types.FETCH_FAIL, fetchFCreditFail)
}
