import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import queryString from 'query-string'
import _omit from 'lodash/omit'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols } from 'state/symbols/utils'
import { updateErrorStatus, updateSuccessStatus } from 'state/status/actions'
import { selectAuth } from 'state/auth/selectors'
import { getTargetSymbols as getFCreditSymbols } from 'state/fundingCreditHistory/selectors'
import { getTargetSymbols as getFLoanSymbols } from 'state/fundingLoanHistory/selectors'
import { getTargetSymbols as getFOfferSymbols } from 'state/fundingOfferHistory/selectors'
import { getTargetSymbols as getLedgersSymbols } from 'state/ledgers/selectors'
import { getTargetSymbols as getMovementsSymbols } from 'state/movements/selectors'
import { getTargetPairs as getOrdersPairs } from 'state/orders/selectors'
import { getTargetPairs as getTickersPairs } from 'state/tickers/selectors'
import { getTargetPairs as getTradesPairs } from 'state/trades/selectors'
import { getTimezone, getDateFormat, getShowMilliseconds } from 'state/base/selectors'
import { getTargetPair as getPublicTradesPair } from 'state/publicTrades/selectors'
import { getTargetPairs as getPositionsPairs } from 'state/positions/selectors'
import { getTimestamp } from 'state/wallets/selectors'
import { getTargetIds as getPositionsIds } from 'state/audit/selectors'

import { getEmail, getQuery, getTimeFrame } from './selectors'
import actions from './actions'
import types from './constants'

const {
  MENU_FCREDIT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_LEDGERS,
  MENU_ORDERS,
  MENU_TICKERS,
  MENU_TRADES,
  MENU_DEPOSITS,
  MENU_POSITIONS,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_TRADES,
  MENU_WALLETS,
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
  if (options.end) { // for wallets
    params.end = options.end
  }
  if (options.id) { // for positions audit
    params.id = options.id
  }
  params.timezone = options.timezone
  params.dateFormat = options.dateFormat
  params.milliseconds = options.milliseconds
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
    case MENU_TICKERS:
      method = 'getTickersHistoryCsv'
      break
    case MENU_TRADES:
      method = 'getTradesCsv'
      break
    case MENU_WITHDRAWALS:
      method = 'getMovementsCsv'
      params.isWithdrawals = true
      break
    case MENU_DEPOSITS:
      method = 'getMovementsCsv'
      params.isDeposits = true
      break
    case MENU_POSITIONS:
      method = 'getPositionsHistoryCsv'
      break
    case MENU_POSITIONS_AUDIT:
      method = 'getPositionsAuditCsv'
      break
    case MENU_PUBLIC_TRADES:
      method = 'getPublicTradesCsv'
      break
    case MENU_WALLETS:
      method = 'getWalletsCsv'
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
      return getFCreditSymbols
    case MENU_FLOAN:
      return getFLoanSymbols
    case MENU_FOFFER:
      return getFOfferSymbols
    case MENU_LEDGERS:
      return getLedgersSymbols
    case MENU_ORDERS:
      return getOrdersPairs
    case MENU_WITHDRAWALS:
    case MENU_DEPOSITS:
      return getMovementsSymbols
    case MENU_TICKERS:
      return getTickersPairs
    case MENU_TRADES:
      return getTradesPairs
    case MENU_POSITIONS:
      return getPositionsPairs
    case MENU_POSITIONS_AUDIT:
      return getPositionsIds
    case MENU_PUBLIC_TRADES:
      return getPublicTradesPair
    case MENU_WALLETS:
      return getTimestamp
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
    case MENU_TICKERS:
    case MENU_TRADES:
    case MENU_POSITIONS:
    case MENU_PUBLIC_TRADES:
    case MENU_FCREDIT:
    case MENU_FLOAN:
    case MENU_FOFFER:
      return formatRawSymbols(sign)
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
    options.milliseconds = yield select(getShowMilliseconds)
    const selector = getSelector(target)
    const sign = selector ? yield select(selector) : ''
    switch (target) {
      case MENU_WALLETS:
        options.end = sign || undefined
        break
      case MENU_POSITIONS_AUDIT:
        options.id = sign || undefined
        break
      default: {
        const symbol = formatSymbol(target, sign)
        if ((Array.isArray(symbol) && symbol > 0)
          || (typeof symbol === 'string' && symbol !== '')) {
          options.symbol = symbol
        }
        break
      }
    }

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
