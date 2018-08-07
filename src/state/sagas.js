import { fork } from 'redux-saga/effects'
import authSaga from './auth/saga'
import baseSaga from './base/saga'
import ledgersSaga from './ledgers/saga'
import movementsSaga from './movements/saga'
import ordersSaga from './orders/saga'
import querySaga from './query/saga'
import tradesSaga from './trades/saga'

export default function* rootSaga() {
  yield fork(authSaga)
  yield fork(baseSaga)
  yield fork(ledgersSaga)
  yield fork(ordersSaga)
  yield fork(movementsSaga)
  yield fork(querySaga)
  yield fork(tradesSaga)
}
