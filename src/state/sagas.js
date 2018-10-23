import { fork } from 'redux-saga/effects'

import { platform } from 'var/config'

import authSaga from './auth/saga'
import baseSaga from './base/saga'
import fcreditSaga from './fundingCreditHistory/saga'
import floanSaga from './fundingLoanHistory/saga'
import fofferSaga from './fundingOfferHistory/saga'
import ledgersSaga from './ledgers/saga'
import movementsSaga from './movements/saga'
import ordersSaga from './orders/saga'
import querySaga from './query/saga'
import tradesSaga from './trades/saga'
import symbolsSaga from './symbols/saga'
import syncSaga from './sync/saga'
import uiSaga from './ui/saga'

export default function* rootSaga() {
  yield fork(authSaga)
  yield fork(baseSaga)
  yield fork(fcreditSaga)
  yield fork(floanSaga)
  yield fork(fofferSaga)
  yield fork(ledgersSaga)
  yield fork(ordersSaga)
  yield fork(movementsSaga)
  yield fork(querySaga)
  yield fork(symbolsSaga)
  yield fork(tradesSaga)
  yield fork(uiSaga)
  if (platform.showSyncMode) {
    yield fork(syncSaga)
  }
}
