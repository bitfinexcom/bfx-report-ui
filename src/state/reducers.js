import { combineReducers } from 'redux'
import { persistReducer, createMigrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { platform } from 'var/config'
import persistMigrations from 'state/persist.migrations'

import accountBalanceReducer from './accountBalance/reducer'
import authReducer from './auth/reducer'
import baseReducer from './base/reducer'
import derivativesReducer from './derivatives/reducer'
import fundingCreditHistoryReducer from './fundingCreditHistory/reducer'
import fundingLoanHistoryReducer from './fundingLoanHistory/reducer'
import fundingOfferHistoryReducer from './fundingOfferHistory/reducer'
import fundingPaymentReducer from './fundingPayment/reducer'
import ledgersReducer from './ledgers/reducer'
import movementsReducer from './movements/reducer'
import ordersReducer from './orders/reducer'
import positionsAuditReducer from './audit/reducer'
import positionsActiveReducer from './positionsActive/reducer'
import positionsReducer from './positions/reducer'
import publicFundingReducer from './publicFunding/reducer'
import publicTradesReducer from './publicTrades/reducer'
import snapshotsReducer from './snapshots/reducer'
import queryReducer from './query/reducer'
import taxReportReducer from './taxReport/reducer'
import tickersReducer from './tickers/reducer'
import tradesReducer from './trades/reducer'
import statusReducer from './status/reducer'
import symbolsReducer from './symbols/reducer'
import syncReducer from './sync/reducer'
import uiReducer from './ui/reducer'
import walletsReducer from './wallets/reducer'
import winLossReducer from './winLoss/reducer'

const PERSIST_WHITELIST = ['base', 'sync']

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
  apositions: positionsActiveReducer,
  audit: positionsAuditReducer,
  auth: authReducer,
  base: baseReducer,
  derivatives: derivativesReducer,
  fcredit: fundingCreditHistoryReducer,
  floan: fundingLoanHistoryReducer,
  foffer: fundingOfferHistoryReducer,
  ledgers: ledgersReducer,
  movements: movementsReducer,
  orders: ordersReducer,
  positions: positionsReducer,
  publicFunding: publicFundingReducer,
  publicTrades: publicTradesReducer,
  query: queryReducer,
  tickers: tickersReducer,
  trades: tradesReducer,
  status: statusReducer,
  sync: syncReducer,
  symbols: symbolsReducer,
  ui: uiReducer,
  wallets: walletsReducer,
}

const FRAMEWORK_REDUCERS = {
  fpayment: fundingPaymentReducer,
  balance: accountBalanceReducer,
  winLoss: winLossReducer,
  snapshots: snapshotsReducer,
  taxReport: taxReportReducer,
}

const REDUCERS = {
  ...BASE_REDUCERS,
  ...(platform.showFrameworkMode ? FRAMEWORK_REDUCERS : {}),
}

const rootReducer = combineReducers(REDUCERS)

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer
