import { call, put, select, takeLatest } from 'redux-saga/effects'
import ledgersTypes from 'state/ledgers/constants'
import tradesTypes from 'state/trades/constants'
import ordersTypes from 'state/orders/constants'
import movementsTypes from 'state/movements/constants'
import { postJsonfetch } from 'state/utils'
import { platform } from 'var/config'
import types from './constants'

function getAuth(apiKey, apiSecret) {
  return postJsonfetch(`${platform.API_URL}/check-auth`, {
    auth: {
      apiKey,
      apiSecret,
    },
  })
}

function* checkAuth() {
  const auth = yield select(state => state.auth)
  try {
    const data = yield call(getAuth, auth.apiKey, auth.apiSecret)
    yield put({
      type: types.UPDATE_AUTH_RESULT,
      payload: (data && data.result) || false,
    })
    if (data && data.result) { // fetch all
      yield put({
        type: ledgersTypes.FETCH_LEDGERS,
      })
      yield put({
        type: tradesTypes.FETCH_TRADES,
      })
      yield put({
        type: ordersTypes.FETCH_ORDERS,
      })
      yield put({
        type: movementsTypes.FETCH_MOVEMENTS,
      })
    }
  } catch (error) {
    // TODO: handle error case
    // eslint-disable-next-line no-console
    console.error(error)
    // yield put({ type: 'REQUEST_FAILED', error })
  }
}

export default function* authSaga() {
  yield takeLatest(types.CHECK_AUTH, checkAuth)
}
