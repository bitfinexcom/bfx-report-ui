import { fork } from 'redux-saga/effects'
import authSaga from './auth/saga'
import ledgersSaga from './ledgers/saga'
import ordersSaga from './orders/saga'
import tradesSaga from './trades/saga'

export default function* rootSaga() {
  yield fork(authSaga)
  yield fork(ledgersSaga)
  yield fork(tradesSaga)
  yield fork(ordersSaga)
}
