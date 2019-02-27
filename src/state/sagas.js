import { fork } from 'redux-saga/effects'

import { platform } from 'var/config'

import authSaga from './auth/saga'
import baseSaga from './base/saga'
import fcreditSaga from './fundingCreditHistory/saga'
import floanSaga from './fundingLoanHistory/saga'
import fofferSaga from './fundingOfferHistory/saga'
import fpaymentSaga from './fundingPayment/saga'
import ledgersSaga from './ledgers/saga'
import movementsSaga from './movements/saga'
import ordersSaga from './orders/saga'
import positionsSaga from './positions/saga'
import positionsAuditSaga from './audit/saga'
import publicTradesSaga from './publicTrades/saga'
import querySaga from './query/saga'
import tickersSaga from './tickers/saga'
import tradesSaga from './trades/saga'
import symbolsSaga from './symbols/saga'
import syncSaga from './sync/saga'
import uiSaga from './ui/saga'
import walletsSaga from './wallets/saga'
import withdrawalsSaga from './withdrawals/saga'

export default function* rootSaga() {
  yield fork(authSaga)
  yield fork(baseSaga)
  yield fork(fcreditSaga)
  yield fork(floanSaga)
  yield fork(fofferSaga)
  yield fork(ledgersSaga)
  yield fork(movementsSaga)
  yield fork(ordersSaga)
  yield fork(positionsSaga)
  yield fork(positionsAuditSaga)
  yield fork(publicTradesSaga)
  yield fork(querySaga)
  yield fork(symbolsSaga)
  yield fork(tickersSaga)
  yield fork(tradesSaga)
  yield fork(uiSaga)
  yield fork(walletsSaga)
  yield fork(withdrawalsSaga)
  if (platform.showSyncMode) {
    yield fork(syncSaga)
    yield fork(fpaymentSaga)
  }
}
