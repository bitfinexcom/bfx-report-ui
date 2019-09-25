import { fork } from 'redux-saga/effects'

import { platform } from 'var/config'

import accountBalanceSaga from './accountBalance/saga'
import authSaga from './auth/saga'
import baseSaga from './base/saga'
import derivativesStatusSaga from './derivativesStatus/saga'
import fcreditSaga from './fundingCreditHistory/saga'
import floanSaga from './fundingLoanHistory/saga'
import fofferSaga from './fundingOfferHistory/saga'
import fpaymentSaga from './fundingPayment/saga'
import ledgersSaga from './ledgers/saga'
import movementsSaga from './movements/saga'
import ordersSaga from './orders/saga'
import positionsSaga from './positions/saga'
import positionsActiveSaga from './positionsActive/saga'
import positionsAuditSaga from './audit/saga'
import publicFundingSaga from './publicFunding/saga'
import publicTradesSaga from './publicTrades/saga'
import snapshotsSaga from './snapshots/saga'
import taxReportSaga from './taxReport/saga'
import querySaga from './query/saga'
import tickersSaga from './tickers/saga'
import tradesSaga from './trades/saga'
import symbolsSaga from './symbols/saga'
import syncSaga from './sync/saga'
import uiSaga from './ui/saga'
import walletsSaga from './wallets/saga'
import winLossSaga from './winLoss/saga'
import wsSaga from './ws/saga'

export default function* rootSaga() {
  yield fork(authSaga)
  yield fork(baseSaga)
  yield fork(derivativesStatusSaga)
  yield fork(fcreditSaga)
  yield fork(floanSaga)
  yield fork(fofferSaga)
  yield fork(ledgersSaga)
  yield fork(movementsSaga)
  yield fork(ordersSaga)
  yield fork(positionsSaga)
  yield fork(positionsActiveSaga)
  yield fork(positionsAuditSaga)
  yield fork(publicFundingSaga)
  yield fork(publicTradesSaga)
  yield fork(querySaga)
  yield fork(symbolsSaga)
  yield fork(tickersSaga)
  yield fork(tradesSaga)
  yield fork(uiSaga)
  yield fork(walletsSaga)
  if (platform.showFrameworkMode) {
    yield fork(syncSaga)
    yield fork(fpaymentSaga)
    yield fork(accountBalanceSaga)
    yield fork(winLossSaga)
    yield fork(snapshotsSaga)
    yield fork(taxReportSaga)
    yield fork(wsSaga)
  }
}
