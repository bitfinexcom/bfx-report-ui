import { call, put, select, takeLatest } from 'redux-saga/effects'
import { getTimeFrame, postJsonfetch, selectAuth } from 'state/utils'
import statusTypes from 'state/status/constants'
import { platform } from 'var/config'
import types from './constants'

function getLedgers(auth) {
  const { start, end, limit } = getTimeFrame()
  return postJsonfetch(`${platform.API_URL}/get-data`, {
    auth,
    method: 'getLedgers',
    params: {
      start,
      end,
      limit,
    },
  })
}

function* fetchLedgers() {
  const auth = yield select(selectAuth)
  try {
    const data = yield call(getLedgers, auth)
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
