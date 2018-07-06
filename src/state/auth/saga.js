import { call, put, select, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import ledgersTypes from 'state/ledgers/constants'
import tradesTypes from 'state/trades/constants'
import ordersTypes from 'state/orders/constants'
import movementsTypes from 'state/movements/constants'
import statusTypes from 'state/status/constants'
import queryTypes from 'state/query/constants'
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

const WAIT_INTERVAL = 500

function* checkAuth() {
  const base = yield select(state => state.base)
  try {
    const data = yield call(getAuth, base.apiKey, base.apiSecret)
    const result = (data && data.result) || false
    yield put({
      type: types.UPDATE_AUTH_STATUS,
      payload: result,
    })

    yield put({
      type: result ? statusTypes.UPDATE_SUCCESS_STATUS : statusTypes.UPDATE_ERROR_STATUS,
      payload: result ? `Auth Success at ${(new Date()).toLocaleString()}` : 'Auth Fail',
    })

    if (data && data.error) {
      yield put({
        type: statusTypes.UPDATE_ERROR_STATUS,
        payload: `Auth fail ${JSON.stringify(data.error)}`,
      })
    }
  } catch (error) {
    yield put({
      type: statusTypes.UPDATE_ERROR_STATUS,
      payload: `Auth request fail ${JSON.stringify(error)}`,
    })
  }
}

function* checkUpdate() {
  try {
    yield call(delay, WAIT_INTERVAL) // do not make a sequent call
    const authStatus = yield select(state => state.auth.authStatus)
    if (authStatus) {
      yield put({
        type: ledgersTypes.FETCH_LEDGERS,
      })
      yield call(delay, WAIT_INTERVAL)
      yield put({
        type: tradesTypes.FETCH_TRADES,
      })
      yield call(delay, WAIT_INTERVAL)
      yield put({
        type: ordersTypes.FETCH_ORDERS,
      })
      yield call(delay, WAIT_INTERVAL)
      yield put({
        type: movementsTypes.FETCH_MOVEMENTS,
      })
    }
  } catch (error) {
    yield put({
      type: statusTypes.UPDATE_ERROR_STATUS,
      payload: `update request fail ${JSON.stringify(error)}`,
    })
  }
}

export default function* authSaga() {
  yield takeLatest(types.CHECK_AUTH, checkAuth)
  yield takeLatest(types.UPDATE_AUTH_STATUS, checkUpdate)
  yield takeLatest(queryTypes.SET_TIME_RANGE, checkUpdate)
}
