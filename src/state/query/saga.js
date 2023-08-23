import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import queryString from 'query-string'
import _assign from 'lodash/assign'
import _includes from 'lodash/includes'

import { LANGUAGES } from 'locales/i18n'
import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, mapRequestSymbols, mapRequestPairs } from 'state/symbols/utils'
import { updateErrorStatus } from 'state/status/actions'
import { getFilterQuery } from 'state/filters/selectors'
import { getTimeframe as getAccountBalanceTimeframe } from 'state/accountBalance/selectors'
import { getTargetSymbols as getAffiliatesEarningsSymbols } from 'state/affiliatesEarnings/selectors'
import { getParams as getCandlesParams } from 'state/candles/selectors'
import { getTargetPairs as getDerivativesPairs } from 'state/derivatives/selectors'
import { getTargetSymbols as getFCreditSymbols } from 'state/fundingCreditHistory/selectors'
import { getTargetSymbols as getFLoanSymbols } from 'state/fundingLoanHistory/selectors'
import { getTargetSymbols as getFOfferSymbols } from 'state/fundingOfferHistory/selectors'
import { getTargetSymbols as getFPaymentSymbols } from 'state/fundingPayment/selectors'
import { getTargetSymbols as getLedgersSymbols, getTargetCategory as getLedgersCategory } from 'state/ledgers/selectors'
import { getTargetSymbols as getInvoicesSymbols } from 'state/invoices/selectors'
import { getParams as getLoanReportParams } from 'state/loanReport/selectors'
import { getTargetSymbols as getMovementsSymbols } from 'state/movements/selectors'
import { getTargetPairs as getOrdersPairs } from 'state/orders/selectors'
import { getParams as getOrderTradesParams } from 'state/orderTrades/selectors'
import { getTargetPairs as getTickersPairs } from 'state/tickers/selectors'
import { getTargetPairs as getTradesPairs } from 'state/trades/selectors'
import { getTargetPair as getWeightedAveragesPair } from 'state/weightedAverages/selectors'
import { getTargetSymbol as getPublicTradesSymbol } from 'state/publicFunding/selectors'
import { getTargetPair as getPublicTradesPair } from 'state/publicTrades/selectors'
import { getTargetPairs as getPositionsPairs } from 'state/positions/selectors'
import { getTimestamp as getSnapshotsTimestamp } from 'state/snapshots/selectors'
import { getTargetSymbols as getSPaymentsSymbols } from 'state/stakingPayments/selectors'
import { getParams as getTradedVolumeParams } from 'state/tradedVolume/selectors'
import { getTimestamp } from 'state/wallets/selectors'
import {
  getIsFundingFees,
  getIsTradingFees,
  getParams as getFeesReportParams,
} from 'state/feesReport/selectors'
import {
  getIsVSPrevDayBalance,
  getIsUnrealizedProfitExcluded,
  getIsVsAccountBalanceSelected,
  getTimeframe as getWinLossTimeframe,
} from 'state/winLoss/selectors'
import { getTargetIds as getPositionsIds } from 'state/audit/selectors'
import { toggleExportDialog, toggleExportSuccessDialog } from 'state/ui/actions'
import LEDGERS_CATEGORIES from 'var/ledgersCategories'
import {
  getTimezone, getDateFormat, getShowMilliseconds, getLocale,
} from 'state/base/selectors'
import { getEmail } from 'state/auth/selectors'
import { getTimeFrame } from 'state/timeRange/selectors'
import config from 'config'

import actions from './actions'
import types from './constants'
import { getExportEmail } from './selectors'
import {
  getQueryLimit,
  NO_TIME_FRAME_TARGETS,
  NO_QUERY_LIMIT_TARGETS,
} from './utils'


const { showFrameworkMode } = config
const {
  MENU_ACCOUNT_BALANCE,
  MENU_AFFILIATES_EARNINGS,
  MENU_CANDLES,
  MENU_CHANGE_LOGS,
  MENU_DERIVATIVES,
  MENU_FCREDIT,
  MENU_FEES_REPORT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_FPAYMENT,
  MENU_INVOICES,
  MENU_LEDGERS,
  MENU_LOAN_REPORT,
  MENU_LOGINS,
  MENU_MOVEMENTS,
  MENU_ORDERS,
  MENU_ORDER_TRADES,
  MENU_TICKERS,
  MENU_TRADES,
  MENU_POSITIONS,
  MENU_POSITIONS_ACTIVE,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_FUNDING,
  MENU_PUBLIC_TRADES,
  MENU_SNAPSHOTS,
  MENU_SPAYMENTS,
  MENU_TAX_REPORT,
  MENU_TRADED_VOLUME,
  MENU_WEIGHTED_AVERAGES,
  MENU_WALLETS,
  MENU_WIN_LOSS,
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

const getMultipleCsv = params => makeFetchCall('getMultipleCsv', params)

function getSelector(target) {
  switch (target) {
    case MENU_ACCOUNT_BALANCE:
      return getAccountBalanceTimeframe
    case MENU_AFFILIATES_EARNINGS:
      return getAffiliatesEarningsSymbols
    case MENU_CANDLES:
      return getCandlesParams
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
    case MENU_INVOICES:
      return getInvoicesSymbols
    case MENU_LEDGERS:
      return getLedgersSymbols
    case MENU_LOAN_REPORT:
      return getLoanReportParams
    case MENU_ORDERS:
      return getOrdersPairs
    case MENU_ORDER_TRADES:
      return getOrderTradesParams
    case MENU_MOVEMENTS:
      return getMovementsSymbols
    case MENU_TICKERS:
      return getTickersPairs
    case MENU_TRADES:
      return getTradesPairs
    case MENU_POSITIONS:
      return getPositionsPairs
    case MENU_POSITIONS_AUDIT:
      return getPositionsIds
    case MENU_PUBLIC_FUNDING:
      return getPublicTradesSymbol
    case MENU_PUBLIC_TRADES:
      return getPublicTradesPair
    case MENU_SNAPSHOTS:
      return getSnapshotsTimestamp
    case MENU_SPAYMENTS:
      return getSPaymentsSymbols
    case MENU_TRADED_VOLUME:
      return getTradedVolumeParams
    case MENU_FEES_REPORT:
      return getFeesReportParams
    case MENU_WEIGHTED_AVERAGES:
      return getWeightedAveragesPair
    case MENU_WALLETS:
      return getTimestamp
    case MENU_WIN_LOSS:
      return getWinLossTimeframe
    default:
      return ''
  }
}

function formatSymbol(target, symbols) {
  // return directly if no symbol
  if (!symbols) {
    return ''
  }
  switch (target) {
    // sections with a single symbol
    case MENU_AFFILIATES_EARNINGS:
    case MENU_LEDGERS:
    case MENU_MOVEMENTS:
    case MENU_FPAYMENT:
    case MENU_SPAYMENTS:
    case MENU_LOAN_REPORT:
    case MENU_FEES_REPORT:
      return mapRequestSymbols(symbols)
    case MENU_PUBLIC_FUNDING:
      return `f${mapRequestSymbols(symbols)}`
    // sections with pairs
    case MENU_CANDLES:
    case MENU_DERIVATIVES:
    case MENU_ORDERS:
    case MENU_ORDER_TRADES:
    case MENU_TICKERS:
    case MENU_TRADED_VOLUME:
    case MENU_TRADES:
    case MENU_WEIGHTED_AVERAGES:
    case MENU_POSITIONS:
    case MENU_POSITIONS_ACTIVE:
    case MENU_PUBLIC_TRADES:
    case MENU_FCREDIT:
    case MENU_FLOAN:
    case MENU_FOFFER:
      return formatRawSymbols(mapRequestPairs(symbols))
    default:
      return ''
  }
}

function* getOptions({ target }) {
  const options = {}
  if (!_includes(NO_TIME_FRAME_TARGETS, target)) {
    const timeFrame = yield select(getTimeFrame)
    _assign(options, timeFrame)
  }
  if (!_includes(NO_QUERY_LIMIT_TARGETS, target)) {
    options.limit = getQueryLimit(target)
  }
  options.timezone = yield select(getTimezone)
  options.dateFormat = yield select(getDateFormat)
  options.milliseconds = yield select(getShowMilliseconds)
  options.filter = yield select(getFilterQuery, target)
  const selector = getSelector(target)
  const sign = selector ? yield select(selector) : ''
  const isFundingFees = showFrameworkMode ? yield select(getIsFundingFees) : ''
  const isTradingFees = showFrameworkMode ? yield select(getIsTradingFees) : ''
  const isVSPrevDayBalance = showFrameworkMode ? yield select(getIsVSPrevDayBalance) : ''
  const isUnrealizedProfitExcluded = showFrameworkMode ? yield select(getIsUnrealizedProfitExcluded) : ''
  const isVsAccountBalanceSelected = showFrameworkMode ? yield select(getIsVsAccountBalanceSelected) : ''

  switch (target) {
    case MENU_ACCOUNT_BALANCE:
    case MENU_WIN_LOSS:
      options.timeframe = sign
      options.isUnrealizedProfitExcluded = isUnrealizedProfitExcluded
      if (isVsAccountBalanceSelected) options.isVSPrevDayBalance = isVSPrevDayBalance
      break
    case MENU_CANDLES:
      options.timeframe = sign.timeframe
      options.symbol = formatSymbol(target, sign.pair)
      break
    case MENU_WALLETS:
    case MENU_SNAPSHOTS:
      options.end = sign || undefined
      break
    case MENU_ORDER_TRADES:
      options.symbol = formatSymbol(target, sign.targetPair)
      options.id = sign.id
      break
    case MENU_LOAN_REPORT:
      options.timeframe = sign.timeframe
      options.symbol = formatSymbol(target, sign.targetSymbols)
      break
    case MENU_TRADED_VOLUME:
      options.timeframe = sign.timeframe
      options.symbol = formatSymbol(target, sign.targetPairs)
      break
    case MENU_WEIGHTED_AVERAGES:
      options.symbol = formatSymbol(target, sign)
      break
    case MENU_FEES_REPORT:
      options.timeframe = sign.timeframe
      options.isFundingFees = isFundingFees
      options.isTradingFees = isTradingFees
      options.symbol = formatSymbol(target, sign.targetSymbols)
      break
    case MENU_TAX_REPORT:
    case MENU_LOGINS:
    case MENU_CHANGE_LOGS:
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
    case MENU_ACCOUNT_BALANCE:
      options.method = 'getBalanceHistoryCsv'
      break
    case MENU_AFFILIATES_EARNINGS:
      options.method = 'getLedgersCsv'
      options.category = LEDGERS_CATEGORIES.AFFILIATE_REBATE
      break
    case MENU_CANDLES:
      options.method = 'getCandlesCsv'
      break
    case MENU_CHANGE_LOGS:
      options.method = 'getChangeLogsCsv'
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
      options.category = LEDGERS_CATEGORIES.FUNDING_PAYMENT
      break
    case MENU_INVOICES:
      options.method = 'getPayInvoiceListCsv'
      break
    case MENU_LEDGERS:
      options.method = 'getLedgersCsv'
      options.category = yield select(getLedgersCategory)
      break
    case MENU_LOAN_REPORT:
      options.method = 'getPerformingLoanCsv'
      break
    case MENU_LOGINS:
      options.method = 'getLoginsCsv'
      break
    case MENU_ORDERS:
      options.method = 'getOrdersCsv'
      break
    case MENU_ORDER_TRADES:
      options.method = 'getOrderTradesCsv'
      break
    case MENU_SPAYMENTS:
      options.method = 'getLedgersCsv'
      options.category = LEDGERS_CATEGORIES.STAKING_PAYMENT
      break
    case MENU_TICKERS:
      options.method = 'getTickersHistoryCsv'
      break
    case MENU_TRADES:
      options.method = 'getTradesCsv'
      break
    case MENU_MOVEMENTS:
      options.method = 'getMovementsCsv'
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
    case MENU_TRADED_VOLUME:
      options.method = 'getTradedVolumeCsv'
      break
    case MENU_FEES_REPORT:
      options.method = 'getTotalFeesReportCsv'
      break
    case MENU_WALLETS:
      options.method = 'getWalletsCsv'
      break
    case MENU_WEIGHTED_AVERAGES:
      options.method = 'getWeightedAveragesReportCsv'
      break
    case MENU_WIN_LOSS:
      options.method = isVsAccountBalanceSelected
        ? 'getWinLossVSAccountBalanceCsv'
        : 'getWinLossCsv'
      break
    default:
      options.method = 'getLedgersCsv'
      break
  }

  return options
}

function* exportCSV({ payload: targets }) {
  try {
    const exportEmail = yield select(getExportEmail)
    const multiExport = []
    // eslint-disable-next-line no-restricted-syntax
    for (const target of targets) {
      const options = yield call(getOptions, { target })
      multiExport.push(options)

      // add 2 additional snapshot reports
      if (target === MENU_TAX_REPORT) {
        multiExport.push({
          ...options,
          isStartSnapshot: true,
        })
        multiExport.push({
          ...options,
          isEndSnapshot: true,
        })
      }
    }

    const locale = yield select(getLocale)
    const params = {
      language: LANGUAGES[locale],
      multiExport,
    }
    if (exportEmail) {
      params.email = exportEmail
    }

    if (showFrameworkMode) {
      yield put(actions.setIsCsvExporting(true))
    }

    const { result, error } = yield call(getMultipleCsv, params)

    if (result) {
      const { localCsvFolderPath, remoteCsvUrn = null } = result
      yield put(actions.setRemoteUrn(remoteCsvUrn))
      yield put(actions.setLocalExportPath(localCsvFolderPath))
      if (!showFrameworkMode) {
        yield put(toggleExportDialog())
        yield put(toggleExportSuccessDialog())
      }
    }

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'download.export',
        detail: error?.message ?? JSON.stringify(error),
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
    if (config.localExport) {
      yield put(actions.setExportEmail(''))
      return
    }

    // owner email from auth
    const ownerEmail = yield select(getEmail)
    // export email
    const { reportEmail } = queryString.parse(window.location.search)
    // use email from the URL when possible
    yield put(actions.setExportEmail(reportEmail || ownerEmail))
  } catch (fail) {
    yield put(actions.setExportEmail(''))
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
