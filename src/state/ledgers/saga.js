import { call, put, select, takeLatest } from 'redux-saga/effects'
import types from './constants'
import { postJsonfetch, selectAuth } from '../../state/utils'

function getLedgers(auth) {
  // let now = (new Date()).getTime();
  return postJsonfetch('http://localhost:31339/get-data', {
    auth,
    method: 'getLedgers',
  })
}

function* fetchLedgers() {
  const auth = yield select(selectAuth)
  try {
    const data = yield call(getLedgers, auth)
    yield put({
      type: types.UPDATE_LEDGERS,
      payload: data && data.result,
    })
  } catch (error) {
    // TODO: handle error case
    // console.error(error)
    // yield put({ type: 'REQUEST_FAILED', error })
  }
}

export default function* ledgersSaga() {
  yield takeLatest(types.FETCH_LEDGERS, fetchLedgers)
}
