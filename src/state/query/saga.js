import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import queryString from 'query-string'
import _includes from 'lodash/includes'

import { LANGUAGES_MAP } from 'locales/i18n'
import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, mapRequestSymbols, mapRequestPairs } from 'state/symbols/utils'
import { updateErrorStatus, updateSuccessStatus } from 'state/status/actions'
import { selectAuth } from 'state/auth/selectors'
import { getTargetSymbols as getAffiliatesEarningsSymbols } from 'state/affiliatesEarnings/selectors'
import { getTargetPairs as getDerivativesPairs } from 'state/derivatives/selectors'
import { getTargetSymbols as getFCreditSymbols } from 'state/fundingCreditHistory/selectors'
import { getTargetSymbols as getFLoanSymbols } from 'state/fundingLoanHistory/selectors'
import { getTargetSymbols as getFOfferSymbols } from 'state/fundingOfferHistory/selectors'
import { getTargetSymbols as getFPaymentSymbols } from 'state/fundingPayment/selectors'
import { getTargetSymbols as getLedgersSymbols } from 'state/ledgers/selectors'
import { getTargetSymbols as getMovementsSymbols } from 'state/movements/selectors'
import { getTargetPairs as getOrdersPairs } from 'state/orders/selectors'
import { getTargetPairs as getTickersPairs } from 'state/tickers/selectors'
import { getTargetPairs as getTradesPairs } from 'state/trades/selectors'
import { getTargetSymbol as getPublicTradesSymbol } from 'state/publicFunding/selectors'
import { getTargetPair as getPublicTradesPair } from 'state/publicTrades/selectors'
import { getTargetPairs as getPositionsPairs } from 'state/positions/selectors'
import { getTargetPairs as getActivePositionsPairs } from 'state/positionsActive/selectors'
import { getTimestamp as getSnapshotsTimestamp } from 'state/snapshots/selectors'
import { getParams as getTaxReportParams } from 'state/taxReport/selectors'
import { getTimestamp } from 'state/wallets/selectors'
import { getTargetIds as getPositionsIds } from 'state/audit/selectors'
import {
  getTimezone, getDateFormat, getShowMilliseconds, getLocale,
} from 'state/base/selectors'
import { platform } from 'var/config'

import {
  getEmail,
  getQuery,
  getTargetQueryLimit,
  getTimeFrame,
} from './selectors'
import actions from './actions'
import { NO_QUERY_LIMIT_TARGETS } from './utils'
import types from './constants'

const {
  MENU_AFFILIATES_EARNINGS,
  MENU_DERIVATIVES,
  MENU_FCREDIT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_FPAYMENT,
  MENU_LEDGERS,
  MENU_ORDERS,
  MENU_TICKERS,
  MENU_TRADES,
  MENU_DEPOSITS,
  MENU_POSITIONS,
  MENU_POSITIONS_ACTIVE,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_FUNDING,
  MENU_PUBLIC_TRADES,
  MENU_SNAPSHOTS,
  MENU_TAX_REPORT,
  MENU_WALLETS,
  MENU_WITHDRAWALS,
} = types

/**
 {
  "auth": {
      "apiKey": "fake",
      "apiSecret": "fake"
  },
  "method": "getMultipleCsv",
  "params": {
      "email": "fake@email.fake",
      "multiExport": [
          {
              "method": "getTradesCsv",
              "symbol": "tBTCUSD",
              "end": 1546765168000
          },
          {
              "method": "getLedgersCsv",
              "symbol": "BTC",
              "end": 1546765168000,
              "timezone": "America/Los_Angeles"
          }
      ]
  }
}
*/
function getMultipleCsv(auth, params) {
  return makeFetchCall('getMultipleCsv', auth, params)
}

function getSelector(target) {
  switch (target) {
    case MENU_AFFILIATES_EARNINGS:
      return getAffiliatesEarningsSymbols
    case MENU_DERIVATIVES:
      return getDerivativesPairs
    case MENU_FCREDIT:
      return getFCreditSymbols
    case MENU_FLOAN:
      return getFLoanSymbols
    case MENU_FOFFER:
      return getFOfferSymbols
    case MENU_FPAYMENT:
      return getFPaymentSymbols
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
    case MENU_POSITIONS_ACTIVE:
      return getActivePositionsPairs
    case MENU_POSITIONS_AUDIT:
      return getPositionsIds
    case MENU_PUBLIC_FUNDING:
      return getPublicTradesSymbol
    case MENU_PUBLIC_TRADES:
      return getPublicTradesPair
    case MENU_SNAPSHOTS:
      return getSnapshotsTimestamp
    case MENU_TAX_REPORT:
      return getTaxReportParams
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
    // sections with a single symbol
    case MENU_AFFILIATES_EARNINGS:
    case MENU_LEDGERS:
    case MENU_WITHDRAWALS:
    case MENU_DEPOSITS:
    case MENU_FPAYMENT:
      return mapRequestSymbols(sign)
    case MENU_PUBLIC_FUNDING:
      return `f${mapRequestSymbols(sign)}`
    // sections with pairs
    case MENU_DERIVATIVES:
    case MENU_ORDERS:
    case MENU_TICKERS:
    case MENU_TRADES:
    case MENU_POSITIONS:
    case MENU_POSITIONS_ACTIVE:
    case MENU_PUBLIC_TRADES:
    case MENU_FCREDIT:
    case MENU_FLOAN:
    case MENU_FOFFER:
      return formatRawSymbols(mapRequestPairs(sign))
    default:
      return ''
  }
}

function* getOptions({ target, query }) {
  const options = {}
  if (!_includes(NO_QUERY_LIMIT_TARGETS, target)) {
    Object.assign(options, getTimeFrame(query, target))
    const getQueryLimit = yield select(getTargetQueryLimit)
    options.limit = getQueryLimit(target)
  }
  options.timezone = yield select(getTimezone)
  options.dateFormat = yield select(getDateFormat)
  options.milliseconds = yield select(getShowMilliseconds)
  const selector = getSelector(target)
  const sign = selector ? yield select(selector) : ''

  switch (target) {
    case MENU_WALLETS:
    case MENU_SNAPSHOTS:
      options.end = sign || undefined
      break
    case MENU_TAX_REPORT:
      options.start = sign.start || undefined
      options.end = sign.end || undefined
      break
    case MENU_POSITIONS_AUDIT:
      options.id = sign || undefined
      break
    default: {
      const symbol = formatSymbol(target, sign)
      if ((Array.isArray(symbol) && symbol.length > 0)
        || (typeof symbol === 'string' && symbol !== '')) {
        options.symbol = symbol
      }
      break
    }
  }

  switch (target) {
    case MENU_AFFILIATES_EARNINGS:
      options.method = 'getLedgersCsv'
      options.isAffiliateRebate = true
      break
    case MENU_DERIVATIVES:
      options.method = 'getStatusMessagesCsv'
      break
    case MENU_FCREDIT:
      options.method = 'getFundingCreditHistoryCsv'
      break
    case MENU_FLOAN:
      options.method = 'getFundingLoanHistoryCsv'
      break
    case MENU_FOFFER:
      options.method = 'getFundingOfferHistoryCsv'
      break
    case MENU_FPAYMENT:
      options.method = 'getLedgersCsv'
      options.isMarginFundingPayment = true
      break
    case MENU_ORDERS:
      options.method = 'getOrdersCsv'
      break
    case MENU_TICKERS:
      options.method = 'getTickersHistoryCsv'
      break
    case MENU_TRADES:
      options.method = 'getTradesCsv'
      break
    case MENU_WITHDRAWALS:
      options.method = 'getMovementsCsv'
      options.isWithdrawals = true
      break
    case MENU_DEPOSITS:
      options.method = 'getMovementsCsv'
      options.isDeposits = true
      break
    case MENU_POSITIONS:
      options.method = 'getPositionsHistoryCsv'
      break
    case MENU_POSITIONS_ACTIVE:
      options.method = 'getActivePositionsCsv'
      break
    case MENU_POSITIONS_AUDIT:
      options.method = 'getPositionsAuditCsv'
      break
    case MENU_PUBLIC_FUNDING:
      options.method = 'getPublicTradesCsv'
      break
    case MENU_PUBLIC_TRADES:
      options.method = 'getPublicTradesCsv'
      break
    case MENU_SNAPSHOTS:
      options.method = 'getFullSnapshotReportCsv'
      break
    case MENU_TAX_REPORT:
      options.method = 'getFullTaxReportCsv'
      break
    case MENU_WALLETS:
      options.method = 'getWalletsCsv'
      break
    case MENU_LEDGERS:
    default:
      options.method = 'getLedgersCsv'
      break
  }

  return options
}

function* exportCSV({ payload: targets }) {
  try {
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const multiExport = []
    // eslint-disable-next-line no-restricted-syntax
    for (const target of targets) {
      const options = yield call(getOptions, { target, query })
      multiExport.push(options)

      // add 2 additional snapshot reports
      if (target === MENU_TAX_REPORT) {
        const { start, end } = yield select(getTaxReportParams)
        const snapshotOptions = yield call(getOptions, { target: MENU_SNAPSHOTS, query })
        multiExport.push({
          ...snapshotOptions,
          end: start || undefined,
        })
        multiExport.push({
          ...snapshotOptions,
          end: end || undefined,
        })
      }
    }

    const locale = yield select(getLocale)
    const params = {
      language: LANGUAGES_MAP[locale],
      multiExport,
    }
    if (query.exportEmail) {
      params.email = query.exportEmail
    }
    const { result, error } = yield call(getMultipleCsv, auth, params)
    if (result) {
      if (result.isSendEmail) {
        yield put(updateSuccessStatus({
          id: 'download.status.email',
          topic: 'download.export',
        }))
      } else if (result.isSaveLocaly) {
        yield put(updateSuccessStatus({
          id: 'download.status.local',
          topic: 'download.export',
        }))
      }
    }

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'download.export',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateErrorStatus({
      id: 'status.request.error',
      topic: 'download.export',
      detail: JSON.stringify(fail),
    }))
  }
}

function* prepareExport() {
  try {
    if (platform.showFrameworkMode) {
      yield put(actions.setExportEmail(false))
      return
    }

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
      topic: 'download.query',
      detail: JSON.stringify(fail),
    }))
  }
}

export default function* exportSaga() {
  yield takeLatest(types.PREPARE_EXPORT, prepareExport)
  yield takeLatest(types.EXPORT_CSV, exportCSV)
}
