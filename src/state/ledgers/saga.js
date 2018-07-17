import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { postJsonfetch, selectAuth } from 'state/utils'
import { getTimeFrame } from 'state/query/selector'
import statusTypes from 'state/status/constants'
import { platform } from 'var/config'
import types from './constants'

function getLedgers(auth, query) {
  const params = getTimeFrame(query)
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
    const data = yield call(getLedgers, auth, query)
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
}
