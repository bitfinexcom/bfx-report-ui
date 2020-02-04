import { combineReducers } from 'redux'
import { persistReducer, createMigrate } from 'redux-persist'
import { connectRouter } from 'connected-react-router'
import storage from 'redux-persist/lib/storage'

import { platform } from 'var/config'
import persistMigrations from 'state/persist.migrations'

import history from './createdHistory'
import accountBalanceReducer from './accountBalance/reducer'
import accountSummaryReducer from './accountSummary/reducer'
import affiliatesEarningsReducer from './affiliatesEarnings/reducer'
import authReducer from './auth/reducer'
import baseReducer from './base/reducer'
import derivativesReducer from './derivatives/reducer'
import feesReportReducer from './feesReport/reducer'
import filtersReducer from './filters/reducer'
import fundingCreditHistoryReducer from './fundingCreditHistory/reducer'
import fundingLoanHistoryReducer from './fundingLoanHistory/reducer'
import fundingOfferHistoryReducer from './fundingOfferHistory/reducer'
import fundingPaymentReducer from './fundingPayment/reducer'
import ledgersReducer from './ledgers/reducer'
import loanReportReducer from './loanReport/reducer'
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
import queryReducer from './query/reducer'
import taxReportReducer from './taxReport/reducer'
import tickersReducer from './tickers/reducer'
import tradedVolumeReducer from './tradedVolume/reducer'
import tradesReducer from './trades/reducer'
import statusReducer from './status/reducer'
import symbolsReducer from './symbols/reducer'
import syncReducer from './sync/reducer'
import uiReducer from './ui/reducer'
import walletsReducer from './wallets/reducer'
import winLossReducer from './winLoss/reducer'

const PERSIST_WHITELIST = ['base']

const PERSIST_VERSION = 0 // starts with -1
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
  apositions: positionsActiveReducer,
  audit: positionsAuditReducer,
  auth: authReducer,
  base: baseReducer,
  derivatives: derivativesReducer,
  fcredit: fundingCreditHistoryReducer,
  filters: filtersReducer,
  floan: fundingLoanHistoryReducer,
  foffer: fundingOfferHistoryReducer,
  ledgers: ledgersReducer,
  movements: movementsReducer,
  orders: ordersReducer,
  orderTrades: orderTradesReducer,
  pagination: paginationReducer,
  positions: positionsReducer,
  publicFunding: publicFundingReducer,
  publicTrades: publicTradesReducer,
  router: connectRouter(history),
  routing: routingReducer,
  query: queryReducer,
  tickers: tickersReducer,
  trades: tradesReducer,
  status: statusReducer,
  symbols: symbolsReducer,
  ui: uiReducer,
  wallets: walletsReducer,
}

const FRAMEWORK_REDUCERS = {
  affiliatesEarnings: affiliatesEarningsReducer,
  fpayment: fundingPaymentReducer,
  balance: accountBalanceReducer,
  loanReport: loanReportReducer,
  tradedVolume: tradedVolumeReducer,
  feesReport: feesReportReducer,
  winLoss: winLossReducer,
  snapshots: snapshotsReducer,
  sync: syncReducer,
  taxReport: taxReportReducer,
}

const REDUCERS = {
  ...BASE_REDUCERS,
  ...(platform.showFrameworkMode ? FRAMEWORK_REDUCERS : {}),
}

const rootReducer = combineReducers(REDUCERS)

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer
