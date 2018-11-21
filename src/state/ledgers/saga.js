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

import types from './constants'
import actions from './actions'
import { getTargetSymbol, getLedgers } from './selectors'

function getReqLedgers(auth, query, targetSymbol, smallestMts) {
  const params = getTimeFrame(query, queryTypes.MENU_LEDGERS, smallestMts)
  if (targetSymbol) {
    params.symbol = targetSymbol
  }
  return makeFetchCall('getLedgers', auth, params)
}

function* fetchLedgers({ payload: symbol }) {
  try {
    const urlSymbol = symbol && symbol.toUpperCase()
    let targetSymbol = yield select(getTargetSymbol)
    // set pair from url
    if (urlSymbol && urlSymbol !== targetSymbol) {
      yield put(actions.setTargetSymbol(urlSymbol))
      targetSymbol = urlSymbol
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqLedgers, auth, query, targetSymbol, 0)
    yield put(actions.updateLedgers(result))

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

const LIMIT = queryTypes.DEFAULT_LEDGERS_QUERY_LIMIT

function* fetchNextLedgers() {
  try {
    const {
      entries,
      offset,
      smallestMts,
      targetSymbol,
    } = yield select(getLedgers)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqLedgers, auth, query, targetSymbol, smallestMts)
    yield put(actions.updateLedgers(result))

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
