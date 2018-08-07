import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './auth/reducer'
import baseReducer from './base/reducer'
import ledgersReducer from './ledgers/reducer'
import movementsReducer from './movements/reducer'
import ordersReducer from './orders/reducer'
import queryReducer from './query/reducer'
import tradesReducer from './trades/reducer'
import statusReducer from './status/reducer'

const PERSIST_WHITELIST = ['base']
const PERSIST_DEBUG = false
const persistConfig = {
  key: 'bfx',
  storage,
  whitelist: PERSIST_WHITELIST,
  debug: PERSIST_DEBUG,
}

const rootReducer = combineReducers({
  auth: authReducer,
  base: baseReducer,
  ledgers: ledgersReducer,
  movements: movementsReducer,
  orders: ordersReducer,
  query: queryReducer,
  trades: tradesReducer,
  status: statusReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer
