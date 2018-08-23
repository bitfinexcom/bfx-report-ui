import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { postJsonfetch, selectAuth } from 'state/utils'
import { getTimeFrame } from 'state/query/selector'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { platform } from 'var/config'

import types from './constants'
import actions from './actions'

function getLedgers(auth, query, currentSymbol, smallestMts) {
  const params = getTimeFrame(query, 'ledgers', smallestMts)
  if (currentSymbol) {
    params.symbol = currentSymbol
  }
  return postJsonfetch(`${platform.API_URL}/get-data`, {
    auth,
    method: 'getLedgers',
    params,
  })
}

function* fetchLedgers() {
  try {
    const ledgers = yield select(state => state.ledgers)
    const { currentSymbol } = ledgers
    const auth = yield select(selectAuth)
    const query = yield select(state => state.query)
    const { result = [], error } = yield call(getLedgers, auth, query, currentSymbol, 0)
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
    const ledgers = yield select(state => state.ledgers)
    const {
      currentSymbol, offset, entries, smallestMts,
    } = ledgers
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(state => state.query)
    const { result = [], error } = yield call(getLedgers, auth, query, currentSymbol, smallestMts)
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

function* fetchLedgersFail(params) {
  yield put(updateErrorStatus(params))
}

export default function* ledgersSaga() {
  yield takeLatest(types.FETCH_LEDGERS, fetchLedgers)
  yield takeLatest(types.SET_SYMBOL, fetchLedgers)
  yield takeLatest(types.FETCH_NEXT_LEDGERS, fetchNextLedgers)
  yield takeLatest(types.FETCH_FAIL, fetchLedgersFail)
}
