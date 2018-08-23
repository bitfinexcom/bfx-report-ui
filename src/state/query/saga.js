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
import actions from './actions'
import types from './constants'

const {
  MENU_LEDGERS,
  MENU_ORDERS,
  MENU_TRADES,
  MENU_DEPOSITS,
  MENU_WITHDRAWALS,
} = types

function getCSV(auth, query, target, symbol) {
  const omitList = query.email === '' ? ['limit', 'email'] : ['limit']
  const params = _omit(getTimeFrame(query, target), omitList)
  if (symbol) {
    params.symbol = symbol
  }
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

function checkEmail(auth) {
  return postJsonfetch(`${platform.API_URL}/check-stored-locally`, {
    auth,
  })
}

function* exportCSV({ payload: target }) {
  try {
    const auth = yield select(selectAuth)
    const query = yield select(state => state.query)
    const symbol = target === MENU_LEDGERS
      ? yield select(state => state.ledgers.currentSymbol) : ''
    const { result, error } = yield call(getCSV, auth, query, target, symbol)
    if (result) {
      if (result.isSendEmail) {
        yield put(updateSuccessStatus({
          id: 'timeframe.download.status.email',
          topic: `${target}.title`,
        }))
      } else if (result.isSaveLocaly) {
        yield put(updateSuccessStatus({
          id: 'timeframe.download.status.local',
          topic: `${target}.title`,
        }))
      }
    }

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'timeframe.download',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateErrorStatus({
      id: 'status.request.error',
      topic: 'timeframe.download',
      detail: JSON.stringify(fail),
    }))
  }
}

function* prepareExport() {
  try {
    const auth = yield select(selectAuth)
    const { result } = yield call(checkEmail, auth)
    yield put(actions.exportReady, result)
  } catch (fail) {
    yield put(actions.exportReady, false)
    yield put(updateErrorStatus({
      id: 'status.request.error',
      topic: 'timeframe.download.query',
      detail: JSON.stringify(fail),
    }))
  }
}


export default function* tradesSaga() {
  yield takeLatest(types.PREPARE_EXPORT, prepareExport)
  yield takeLatest(types.EXPORT_CSV, exportCSV)
}
