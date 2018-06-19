import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { platform } from 'var/config'
import authReducer from './auth/reducer'
import ledgersReducer from './ledgers/reducer'
import movementsReducer from './movements/reducer'
import ordersReducer from './orders/reducer'
import tradesReducer from './trades/reducer'
import statusReducer from './status/reducer'

const PERSIST_WHITELIST = ['auth']
const PERSIST_DEBUG = false
const persistConfig = {
  key: platform.id,
  storage,
  whitelist: PERSIST_WHITELIST,
  debug: PERSIST_DEBUG,
}

const rootReducer = combineReducers({
  auth: authReducer,
  ledgers: ledgersReducer,
  movements: movementsReducer,
  orders: ordersReducer,
  trades: tradesReducer,
  status: statusReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer
