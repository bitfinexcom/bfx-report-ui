import { fork } from 'redux-saga/effects'

import config from 'config'

import accountBalanceSaga from './accountBalance/saga'
import accountSummarySaga from './accountSummary/saga'
import affiliatesEarningsSaga from './affiliatesEarnings/saga'
import authSaga from './auth/saga'
import baseSaga from './base/saga'
import candlesSaga from './candles/saga'
import changeLogsSaga from './changeLogs/saga'
import columnsSaga from './columns/saga'
import derivativesSaga from './derivatives/saga'
import fcreditSaga from './fundingCreditHistory/saga'
import feesReportSaga from './feesReport/saga'
import filtersSaga from './filters/saga'
import floanSaga from './fundingLoanHistory/saga'
import fofferSaga from './fundingOfferHistory/saga'
import fpaymentSaga from './fundingPayment/saga'
import invoicesSaga from './invoices/saga'
import ledgersSaga from './ledgers/saga'
import loanReportSaga from './loanReport/saga'
import loginsSaga from './logins/saga'
import movementsSaga from './movements/saga'
import ordersSaga from './orders/saga'
import orderTradesSaga from './orderTrades/saga'
import paginationSaga from './pagination/saga'
import positionsSaga from './positions/saga'
import positionsActiveSaga from './positionsActive/saga'
import positionsAuditSaga from './audit/saga'
import publicFundingSaga from './publicFunding/saga'
import publicTradesSaga from './publicTrades/saga'
import routingSaga from './routing/saga'
import snapshotsSaga from './snapshots/saga'
import spaymentsSaga from './stakingPayments/saga'
import taxReportSaga from './taxReport/saga'
import querySaga from './query/saga'
import tickersSaga from './tickers/saga'
import tradedVolumeSaga from './tradedVolume/saga'
import tradesSaga from './trades/saga'
import subAccountsSaga from './subAccounts/saga'
import symbolsSaga from './symbols/saga'
import syncSaga from './sync/saga'
import uiSaga from './ui/saga'
import walletsSaga from './wallets/saga'
import winLossSaga from './winLoss/saga'
import wsSaga from './ws/saga'
import weightedAveragesSaga from './weightedAverages/saga'

const { showFrameworkMode } = config

export default function* rootSaga() {
  yield fork(authSaga)
  yield fork(accountSummarySaga)
  yield fork(affiliatesEarningsSaga)
  yield fork(baseSaga)
  yield fork(candlesSaga)
  yield fork(changeLogsSaga)
  yield fork(columnsSaga)
  yield fork(derivativesSaga)
  yield fork(fcreditSaga)
  yield fork(filtersSaga)
  yield fork(floanSaga)
  yield fork(fofferSaga)
  yield fork(invoicesSaga)
  yield fork(ledgersSaga)
  yield fork(loginsSaga)
  yield fork(fpaymentSaga)
  yield fork(movementsSaga)
  yield fork(ordersSaga)
  yield fork(orderTradesSaga)
  yield fork(paginationSaga)
  yield fork(positionsSaga)
  yield fork(positionsActiveSaga)
  yield fork(positionsAuditSaga)
  yield fork(publicFundingSaga)
  yield fork(publicTradesSaga)
  yield fork(routingSaga)
  yield fork(querySaga)
  yield fork(spaymentsSaga)
  yield fork(symbolsSaga)
  yield fork(tickersSaga)
  yield fork(tradesSaga)
  yield fork(uiSaga)
  yield fork(walletsSaga)
  yield fork(weightedAveragesSaga)
  if (showFrameworkMode) {
    yield fork(accountBalanceSaga)
    yield fork(feesReportSaga)
    yield fork(loanReportSaga)
    yield fork(snapshotsSaga)
    yield fork(subAccountsSaga)
    yield fork(syncSaga)
    yield fork(taxReportSaga)
    yield fork(tradedVolumeSaga)
    yield fork(winLossSaga)
    yield fork(wsSaga)
  }
}
