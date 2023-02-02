import { combineReducers } from 'redux'
import { persistReducer, createMigrate } from 'redux-persist'
import { connectRouter } from 'connected-react-router'
import storage from 'redux-persist/lib/storage'

import config from 'config'
import persistMigrations from 'state/persist.migrations'

import history from './createdHistory'
import accountBalanceReducer from './accountBalance/reducer'
import accountSummaryReducer from './accountSummary/reducer'
import affiliatesEarningsReducer from './affiliatesEarnings/reducer'
import authReducer from './auth/reducer'
import baseReducer from './base/reducer'
import candlesReducer from './candles/reducer'
import changeLogsReducer from './changeLogs/reducer'
import columnsReducer from './columns/reducer'
import derivativesReducer from './derivatives/reducer'
import feesReportReducer from './feesReport/reducer'
import filtersReducer from './filters/reducer'
import fundingCreditHistoryReducer from './fundingCreditHistory/reducer'
import fundingLoanHistoryReducer from './fundingLoanHistory/reducer'
import fundingOfferHistoryReducer from './fundingOfferHistory/reducer'
import fundingPaymentReducer from './fundingPayment/reducer'
import goToRangeReducer from './goToRange/reducer'
import invoicesReducer from './invoices/reducer'
import ledgersReducer from './ledgers/reducer'
import loanReportReducer from './loanReport/reducer'
import loginsReducer from './logins/reducer'
import movementsReducer from './movements/reducer'
import ordersReducer from './orders/reducer'
import orderTradesReducer from './orderTrades/reducer'
import paginationReducer from './pagination/reducer'
import positionsAuditReducer from './audit/reducer'
import positionsActiveReducer from './positionsActive/reducer'
import positionsReducer from './positions/reducer'
import publicFundingReducer from './publicFunding/reducer'
import publicTradesReducer from './publicTrades/reducer'
import routingReducer from './routing/reducer'
import snapshotsReducer from './snapshots/reducer'
import stakingPaymentsReducer from './stakingPayments/reducer'
import queryReducer from './query/reducer'
import taxReportReducer from './taxReport/reducer'
import tickersReducer from './tickers/reducer'
import timeRangeReducer from './timeRange/reducer'
import tradedVolumeReducer from './tradedVolume/reducer'
import tradesReducer from './trades/reducer'
import statusReducer from './status/reducer'
import symbolsReducer from './symbols/reducer'
import syncReducer from './sync/reducer'
import uiReducer from './ui/reducer'
import walletsReducer from './wallets/reducer'
import winLossReducer from './winLoss/reducer'
import weightedAveragesReducer from './weightedAverages/reducer'

const PERSIST_WHITELIST = [
  'base',
  'timeRange',
]

const PERSIST_VERSION = 1 // starts with -1
const PERSIST_DEBUG = false

const persistConfig = {
  key: 'bfx',
  version: PERSIST_VERSION,
  storage,
  whitelist: PERSIST_WHITELIST,
  debug: PERSIST_DEBUG,
  migrate: createMigrate(persistMigrations, { debug: PERSIST_DEBUG }),
}

const BASE_REDUCERS = {
  accountSummary: accountSummaryReducer,
  affiliatesEarnings: affiliatesEarningsReducer,
  apositions: positionsActiveReducer,
  audit: positionsAuditReducer,
  auth: authReducer,
  base: baseReducer,
  candles: candlesReducer,
  changeLogs: changeLogsReducer,
  columns: columnsReducer,
  derivatives: derivativesReducer,
  fcredit: fundingCreditHistoryReducer,
  filters: filtersReducer,
  floan: fundingLoanHistoryReducer,
  foffer: fundingOfferHistoryReducer,
  fpayment: fundingPaymentReducer,
  goToRange: goToRangeReducer,
  invoices: invoicesReducer,
  ledgers: ledgersReducer,
  logins: loginsReducer,
  movements: movementsReducer,
  orders: ordersReducer,
  orderTrades: orderTradesReducer,
  pagination: paginationReducer,
  positions: positionsReducer,
  publicFunding: publicFundingReducer,
  publicTrades: publicTradesReducer,
  router: connectRouter(history),
  routing: routingReducer,
  spayments: stakingPaymentsReducer,
  query: queryReducer,
  tickers: tickersReducer,
  timeRange: timeRangeReducer,
  trades: tradesReducer,
  status: statusReducer,
  symbols: symbolsReducer,
  ui: uiReducer,
  wallets: walletsReducer,
}

const FRAMEWORK_REDUCERS = {
  balance: accountBalanceReducer,
  loanReport: loanReportReducer,
  tradedVolume: tradedVolumeReducer,
  feesReport: feesReportReducer,
  winLoss: winLossReducer,
  snapshots: snapshotsReducer,
  sync: syncReducer,
  taxReport: taxReportReducer,
  weightedAverages: weightedAveragesReducer,
}

const REDUCERS = {
  ...BASE_REDUCERS,
  ...(config.showFrameworkMode ? FRAMEWORK_REDUCERS : {}),
}

const rootReducer = combineReducers(REDUCERS)

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer
