import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { platform } from 'var/config'

import authReducer from './auth/reducer'
import baseReducer from './base/reducer'
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
import queryReducer from './query/reducer'
import riskReducer from './risk/reducer'
import tickersReducer from './tickers/reducer'
import tradesReducer from './trades/reducer'
import statusReducer from './status/reducer'
import symbolsReducer from './symbols/reducer'
import syncReducer from './sync/reducer'
import uiReducer from './ui/reducer'
import walletsReducer from './wallets/reducer'

const PERSIST_WHITELIST = ['base']
const PERSIST_DEBUG = false
const persistConfig = {
  key: 'bfx',
  storage,
  whitelist: PERSIST_WHITELIST,
  debug: PERSIST_DEBUG,
}

const BASE_REDUCERS = {
  apositions: positionsActiveReducer,
  audit: positionsAuditReducer,
  auth: authReducer,
  base: baseReducer,
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
  risk: riskReducer,
  tickers: tickersReducer,
  trades: tradesReducer,
  status: statusReducer,
  symbols: symbolsReducer,
  ui: uiReducer,
  wallets: walletsReducer,
}

const REDUCERS = platform.showSyncMode
  ? {
    ...BASE_REDUCERS,
    fpayment: fundingPaymentReducer,
    sync: syncReducer,
  }
  : BASE_REDUCERS

const rootReducer = combineReducers(REDUCERS)

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer
