import { put, takeLatest } from 'redux-saga/effects'

import queryTypes from 'state/query/constants'
import { fetchLedgers } from 'state/ledgers/actions'
import { fetchTrades } from 'state/trades/actions'
import { fetchOrders } from 'state/orders/actions'
import { fetchMovements } from 'state/movements/actions'
import { fetchPositions } from 'state/positions/actions'
import { fetchPAudit } from 'state/audit/actions'
import { fetchFCredit } from 'state/fundingCreditHistory/actions'
import { fetchFLoan } from 'state/fundingLoanHistory/actions'
import { fetchFOffer } from 'state/fundingOfferHistory/actions'
import { fetchFPayment } from 'state/fundingPayment/actions'
import { fetchData as fetchSPayments } from 'state/stakingPayments/actions'
import { fetchAffiliatesEarnings } from 'state/affiliatesEarnings/actions'
import { fetchPublicTrades } from 'state/publicTrades/actions'
import { fetchPublicFunding } from 'state/publicFunding/actions'
import { fetchTickers } from 'state/tickers/actions'
import { fetchData as fetchLogins } from 'state/logins/actions'
import { fetchData as fetchChangeLogs } from 'state/changeLogs/actions'

import types from './constants'

const {
  MENU_LEDGERS,
  MENU_TRADES,
  MENU_ORDERS,
  MENU_MOVEMENTS,
  MENU_POSITIONS,
  MENU_POSITIONS_AUDIT,
  MENU_FOFFER,
  MENU_FLOAN,
  MENU_FCREDIT,
  MENU_FPAYMENT,
  MENU_AFFILIATES_EARNINGS,
  MENU_PUBLIC_TRADES,
  MENU_PUBLIC_FUNDING,
  MENU_SPAYMENTS,
  MENU_TICKERS,
  MENU_LOGINS,
  MENU_CHANGE_LOGS,
} = queryTypes

function* fetchNext({ payload }) {
  const { section } = payload

  const options = {
    nextFetch: true,
  }

  switch (section) {
    case MENU_LEDGERS:
      return yield put(fetchLedgers(options))
    case MENU_TRADES:
      return yield put(fetchTrades(options))
    case MENU_ORDERS:
      return yield put(fetchOrders(options))
    case MENU_MOVEMENTS:
      return yield put(fetchMovements(options))
    case MENU_POSITIONS:
      return yield put(fetchPositions(options))
    case MENU_POSITIONS_AUDIT:
      return yield put(fetchPAudit(options))
    case MENU_FOFFER:
      return yield put(fetchFOffer(options))
    case MENU_FLOAN:
      return yield put(fetchFLoan(options))
    case MENU_FCREDIT:
      return yield put(fetchFCredit(options))
    case MENU_FPAYMENT:
      return yield put(fetchFPayment(options))
    case MENU_SPAYMENTS:
      return yield put(fetchSPayments(options))
    case MENU_AFFILIATES_EARNINGS:
      return yield put(fetchAffiliatesEarnings(options))
    case MENU_PUBLIC_TRADES:
      return yield put(fetchPublicTrades(options))
    case MENU_PUBLIC_FUNDING:
      return yield put(fetchPublicFunding(options))
    case MENU_TICKERS:
      return yield put(fetchTickers(options))
    case MENU_LOGINS:
      return yield put(fetchLogins(options))
    case MENU_CHANGE_LOGS:
      return yield put(fetchChangeLogs(options))
    default:
      return undefined
  }
}

export default function* filtersSaga() {
  yield takeLatest(types.FETCH_NEXT, fetchNext)
}
