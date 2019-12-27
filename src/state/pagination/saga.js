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
import { fetchAffiliatesEarnings } from 'state/affiliatesEarnings/actions'
import { fetchPublicTrades } from 'state/publicTrades/actions'
import { fetchPublicFunding } from 'state/publicFunding/actions'
import { fetchTickers } from 'state/tickers/actions'

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
  MENU_TICKERS,
} = queryTypes

function* fetchNext({ payload }) {
  const { section } = payload

  switch (section) {
    case MENU_LEDGERS:
      return yield put(fetchLedgers({ nextFetch: true }))
    case MENU_TRADES:
      return yield put(fetchTrades({ nextFetch: true }))
    case MENU_ORDERS:
      return yield put(fetchOrders({ nextFetch: true }))
    case MENU_MOVEMENTS:
      return yield put(fetchMovements({ nextFetch: true }))
    case MENU_POSITIONS:
      return yield put(fetchPositions({ nextFetch: true }))
    case MENU_POSITIONS_AUDIT:
      return yield put(fetchPAudit({ nextFetch: true }))
    case MENU_FOFFER:
      return yield put(fetchFOffer({ nextFetch: true }))
    case MENU_FLOAN:
      return yield put(fetchFLoan({ nextFetch: true }))
    case MENU_FCREDIT:
      return yield put(fetchFCredit({ nextFetch: true }))
    case MENU_FPAYMENT:
      return yield put(fetchFPayment({ nextFetch: true }))
    case MENU_AFFILIATES_EARNINGS:
      return yield put(fetchAffiliatesEarnings({ nextFetch: true }))
    case MENU_PUBLIC_TRADES:
      return yield put(fetchPublicTrades({ nextFetch: true }))
    case MENU_PUBLIC_FUNDING:
      return yield put(fetchPublicFunding({ nextFetch: true }))
    case MENU_TICKERS:
      return yield put(fetchTickers({ nextFetch: true }))
    default:
      return undefined
  }
}

export default function* filtersSaga() {
  yield takeLatest([types.FETCH_NEXT, types.FETCH_PREV], fetchNext)
}
