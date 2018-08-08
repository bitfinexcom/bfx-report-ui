import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import _omit from 'lodash/omit'

import { postJsonfetch, selectAuth } from 'state/utils'
import { updateErrorStatus, updateSuccessStatus } from 'state/status/actions'
import { platform } from 'var/config'

import { getTimeFrame } from './selector'
import types from './constants'

const {
  MENU_LEDGERS,
  MENU_ORDERS,
  MENU_TRADES,
  MENU_DEPOSITS,
  MENU_WITHDRAWALS,
} = types

function getCSV(auth, query, target) {
  const params = _omit(getTimeFrame(query, target), 'limit')
  let method = ''
  switch (target) {
    case MENU_ORDERS:
      method = 'getOrdersCsv'
      break
    case MENU_TRADES:
      method = 'getTradesCsv'
      break
    case MENU_WITHDRAWALS:
    case MENU_DEPOSITS:
      method = 'getMovementsCsv'
      break
    case MENU_LEDGERS:
    default:
      method = 'getLedgersCsv'
      break
  }

  return postJsonfetch(`${platform.API_URL}/get-data`, {
    auth,
    method,
    params,
  })
}

function* exportCSV({ payload: target }) {
  try {
    const auth = yield select(selectAuth)
    const query = yield select(state => state.query)
    const data = yield call(getCSV, auth, query, target)
    const { result = [], error } = data
    if (result) {
      if (platform.id === 'local') {
        yield put(updateSuccessStatus(`${target} csv generated, please check your local 'csv' folder`))
      } else {
        yield put(updateSuccessStatus(`${target} csv sent, please check your Email`))
      }
    }

    if (error) {
      yield put(updateErrorStatus(`Ledgers fail ${JSON.stringify(error)}`))
    }
  } catch (fail) {
    yield put(updateErrorStatus(`Ledgers request fail ${JSON.stringify(fail)}`))
  }
}

export default function* tradesSaga() {
  yield takeLatest(types.EXPORT_CSV, exportCSV)
}
