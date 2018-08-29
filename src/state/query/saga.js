import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import _omit from 'lodash/omit'

import { formatRawPairToSymbol, getUrlParameter, postJsonfetch } from 'state/utils'
import { updateErrorStatus, updateSuccessStatus } from 'state/status/actions'
import { selectAuth } from 'state/auth/selectors'
import { getCurrentSymbol } from 'state/ledgers/selectors'
import { getTargetPair } from 'state/orders/selectors'

import { platform } from 'var/config'

import { getQuery, getTimeFrame } from './selectors'
import actions from './actions'
import types from './constants'

const {
  MENU_FCREDIT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_LEDGERS,
  MENU_ORDERS,
  MENU_TRADES,
  MENU_DEPOSITS,
  MENU_WITHDRAWALS,
} = types

function getCSV(auth, query, target, symbol) {
  const params = _omit(getTimeFrame(query, target), 'limit')
  if (query.email) {
    params.email = query.email
  }
  if (symbol) {
    params.symbol = symbol
  }
  let method = ''
  switch (target) {
    case MENU_FCREDIT:
      method = 'getFundingCreditHistoryCsv'
      break
    case MENU_FLOAN:
      method = 'getFundingLoanHistoryCsv'
      break
    case MENU_FOFFER:
      method = 'getFundingOfferHistoryCsv'
      break
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

function getSelector(target) {
  switch (target) {
    case MENU_LEDGERS:
      return getCurrentSymbol
    case MENU_ORDERS:
      return getTargetPair
    default:
      return ''
  }
}

function formatSymbol(target, sign) {
  switch (target) {
    case MENU_LEDGERS:
      return sign
    case MENU_ORDERS:
      return formatRawPairToSymbol(sign)
    default:
      return ''
  }
}

function* exportCSV({ payload: target }) {
  try {
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const selector = getSelector(target)
    const sign = selector ? yield select(selector) : ''
    const { result, error } = yield call(getCSV, auth, query, target, formatSymbol(sign))
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
    const { result, error } = yield call(checkEmail, auth)
    const reportEmail = getUrlParameter('reportEmail')
    // send email get from the URL when possible
    if (reportEmail && result) {
      yield put(actions.exportReady(reportEmail))
    } else {
      yield put(actions.exportReady(result))
    }

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'timeframe.download.query',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.exportReady(false))
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
