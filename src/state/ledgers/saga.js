import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { postJsonfetch, selectAuth } from 'state/utils'
import { getTimeFrame } from 'state/query/selector'
import statusTypes from 'state/status/constants'
import queryTypes from 'state/query/constants'
import { platform } from 'var/config'
import types from './constants'

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
    yield put({
      type: types.UPDATE_LEDGERS,
      payload: (data && data.result) || [],
    })

    if (data && data.error) {
      yield put({
        type: statusTypes.UPDATE_ERROR_STATUS,
        payload: `Ledgers fail ${JSON.stringify(data.error)}`,
      })
    }
  } catch (error) {
    yield put({
      type: statusTypes.UPDATE_ERROR_STATUS,
      payload: `Ledgers request fail ${JSON.stringify(error)}`,
    })
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
    yield put({
      type: types.UPDATE_LEDGERS,
      payload: (data && data.result) || [],
    })

    if (data && data.error) {
      yield put({
        type: statusTypes.UPDATE_ERROR_STATUS,
        payload: `Ledgers fail ${JSON.stringify(data.error)}`,
      })
    }
  } catch (error) {
    yield put({
      type: statusTypes.UPDATE_ERROR_STATUS,
      payload: `Ledgers request fail ${JSON.stringify(error)}`,
    })
  }
}

export default function* ledgersSaga() {
  yield takeLatest(types.FETCH_LEDGERS, fetchLedgers)
  yield takeLatest(types.FETCH_NEXT_LEDGERS, fetchNextLedgers)
}
