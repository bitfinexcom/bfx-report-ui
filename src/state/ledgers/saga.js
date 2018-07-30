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

function getLedgers(auth, query, smallestMts) {
  const params = getTimeFrame(query, 'ledgers', smallestMts)
  return postJsonfetch(`${platform.API_URL}/get-data`, {
    auth,
    method: 'getLedgers',
    params,
  })
}

function* fetchLedgers() {
  try {
    const auth = yield select(selectAuth)
    const query = yield select(state => state.query)
    const data = yield call(getLedgers, auth, query, 0)
    const { result = [], error } = data
    yield put(actions.updateLedgers(result))

    if (error) {
      yield put(updateErrorStatus(`Ledgers fail ${JSON.stringify(error)}`))
    }
  } catch (fail) {
    yield put(updateErrorStatus(`Ledgers request fail ${JSON.stringify(fail)}`))
  }
}

const LIMIT = queryTypes.DEFAULT_LEDGERS_QUERY_LIMIT

function* fetchNextLedgers() {
  try {
    const ledgers = yield select(state => state.ledgers)
    const { offset, entries, smallestMts } = ledgers
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(state => state.query)
    const data = yield call(getLedgers, auth, query, smallestMts)
    const { result = [], error } = data
    yield put(actions.updateLedgers(result))

    if (error) {
      yield put(updateErrorStatus(`Ledgers fail ${JSON.stringify(error)}`))
    }
  } catch (fail) {
    yield put(updateErrorStatus(`Ledgers request fail ${JSON.stringify(fail)}`))
  }
}

export default function* ledgersSaga() {
  yield takeLatest(types.FETCH_LEDGERS, fetchLedgers)
  yield takeLatest(types.FETCH_NEXT_LEDGERS, fetchNextLedgers)
}
