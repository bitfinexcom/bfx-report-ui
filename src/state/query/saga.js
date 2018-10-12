import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import queryString from 'query-string'
import _omit from 'lodash/omit'

import {
  formatRawPairToTPair,
  formatRawSymbolToFSymbol,
  makeFetchCall,
} from 'state/utils'
import { updateErrorStatus, updateSuccessStatus } from 'state/status/actions'
import { selectAuth } from 'state/auth/selectors'
import { getTargetSymbol as getFCreditSymbol } from 'state/fundingCreditHistory/selectors'
import { getTargetSymbol as getFLoanSymbol } from 'state/fundingLoanHistory/selectors'
import { getTargetSymbol as getFOfferSymbol } from 'state/fundingOfferHistory/selectors'
import { getTargetSymbol as getLedgersSymbol } from 'state/ledgers/selectors'
import { getTargetSymbol as getMovementsSymbol } from 'state/movements/selectors'
import { getTargetPair as getOrdersPair } from 'state/orders/selectors'
import { getTargetPair as getTradesPair } from 'state/trades/selectors'
import { getTimezone, getDateFormat } from 'state/base/selectors'

import { getEmail, getQuery, getTimeFrame } from './selectors'
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

function getCSV(auth, query, target, options) {
  const params = _omit(getTimeFrame(query, target), 'limit')
  if (query.exportEmail) {
    params.email = query.exportEmail
  }
  if (options.symbol) {
    params.symbol = options.symbol
  }
  params.timezone = options.timezone
  params.dateFormat = options.dateFormat
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
  return makeFetchCall(method, auth, params)
}

function getSelector(target) {
  switch (target) {
    case MENU_FCREDIT:
      return getFCreditSymbol
    case MENU_FLOAN:
      return getFLoanSymbol
    case MENU_FOFFER:
      return getFOfferSymbol
    case MENU_LEDGERS:
      return getLedgersSymbol
    case MENU_ORDERS:
      return getOrdersPair
    case MENU_WITHDRAWALS:
    case MENU_DEPOSITS:
      return getMovementsSymbol
    case MENU_TRADES:
      return getTradesPair
    default:
      return ''
  }
}

function formatSymbol(target, sign) {
  // return directly if no sign
  if (!sign) {
    return ''
  }
  switch (target) {
    case MENU_LEDGERS:
    case MENU_WITHDRAWALS:
    case MENU_DEPOSITS:
      return sign
    case MENU_ORDERS:
    case MENU_TRADES:
      return formatRawPairToTPair(sign)
    case MENU_FCREDIT:
    case MENU_FLOAN:
    case MENU_FOFFER:
      return formatRawSymbolToFSymbol(sign)
    default:
      return ''
  }
}

function* exportCSV({ payload: target }) {
  try {
    const options = {}
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    options.timezone = yield select(getTimezone)
    options.dateFormat = yield select(getDateFormat)
    const selector = getSelector(target)
    const sign = selector ? yield select(selector) : ''
    options.symbol = formatSymbol(target, sign)
    const { result, error } = yield call(getCSV, auth, query, target, options)
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
    // owner email now get while first auth-check
    const result = yield select(getEmail)
    // export email
    const { reportEmail } = queryString.parse(window.location.search)
    // send email get from the URL when possible
    if (reportEmail && result) {
      yield put(actions.setExportEmail(reportEmail))
    } else {
      yield put(actions.setExportEmail(result))
    }
  } catch (fail) {
    yield put(actions.setExportEmail(false))
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
