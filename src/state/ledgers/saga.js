import { call, put, select, takeLatest } from 'redux-saga/effects'
import { getTimeFrame, postJsonfetch, selectAuth } from 'state/utils'
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
  } catch (error) {
    // TODO: handle error case
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

export default function* ledgersSaga() {
  yield takeLatest(types.FETCH_LEDGERS, fetchLedgers)
}
