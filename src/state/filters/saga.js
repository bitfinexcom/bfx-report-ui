import {
  put,
  takeLatest,
} from 'redux-saga/effects'

import queryTypes from 'state/query/constants'
import { getTarget } from 'state/query/utils'
import uiTypes from 'state/ui/constants'
import { decodeFilters } from 'state/filters/utils'
import { fetchLedgers, refresh as refreshLedgers } from 'state/ledgers/actions'
import { fetchTrades, refresh as refreshTrades } from 'state/trades/actions'
import { fetchOrders, refresh as refreshOrders } from 'state/orders/actions'
import { fetchMovements, refresh as refreshMovements } from 'state/movements/actions'
import { fetchPositions, refresh as refreshPositions } from 'state/positions/actions'
import { fetchFOffer, refresh as refreshFOffer } from 'state/fundingOfferHistory/actions'
import { fetchFLoan, refresh as refreshFLoan } from 'state/fundingLoanHistory/actions'
import { fetchFCredit, refresh as refreshFCredit } from 'state/fundingCreditHistory/actions'
import { fetchFPayment, refresh as refreshFPayment } from 'state/fundingPayment/actions'
import { fetchAffiliatesEarnings, refresh as refreshAffiliatesEarnings } from 'state/affiliatesEarnings/actions'
import { fetchPublicTrades, refresh as refreshPublicTrades } from 'state/publicTrades/actions'
import { fetchPublicFunding, refresh as refreshPublicFunding } from 'state/publicFunding/actions'
import { fetchTickers, refresh as refreshTickers } from 'state/tickers/actions'
import { fetchDerivatives, refresh as refreshDerivatives } from 'state/derivatives/actions'

import types from './constants'
import actions from './actions'

const {
  MENU_LEDGERS,
  MENU_TRADES,
  MENU_ORDERS,
  MENU_MOVEMENTS,
  MENU_POSITIONS,
  MENU_FOFFER,
  MENU_FLOAN,
  MENU_FCREDIT,
  MENU_FPAYMENT,
  MENU_AFFILIATES_EARNINGS,
  MENU_PUBLIC_TRADES,
  MENU_PUBLIC_FUNDING,
  MENU_TICKERS,
  MENU_DERIVATIVES,

  // filters parsing
  MENU_DEPOSITS,
  MENU_WITHDRAWALS,
} = queryTypes

export function* setFilters({ payload }) {
  const { section, refresh = true } = payload

  if (!refresh) {
    return
  }

  switch (section) {
    case MENU_LEDGERS:
      yield put(refreshLedgers())
      yield put(fetchLedgers())
      break
    case MENU_TRADES:
      yield put(refreshTrades())
      yield put(fetchTrades())
      break
    case MENU_ORDERS:
      yield put(refreshOrders())
      yield put(fetchOrders())
      break
    case MENU_MOVEMENTS:
      yield put(refreshMovements())
      yield put(fetchMovements())
      break
    case MENU_POSITIONS:
      yield put(refreshPositions())
      yield put(fetchPositions())
      break
    case MENU_FOFFER:
      yield put(refreshFOffer())
      yield put(fetchFOffer())
      break
    case MENU_FLOAN:
      yield put(refreshFLoan())
      yield put(fetchFLoan())
      break
    case MENU_FCREDIT:
      yield put(refreshFCredit())
      yield put(fetchFCredit())
      break
    case MENU_FPAYMENT:
      yield put(refreshFPayment())
      yield put(fetchFPayment())
      break
    case MENU_AFFILIATES_EARNINGS:
      yield put(refreshAffiliatesEarnings())
      yield put(fetchAffiliatesEarnings())
      break
    case MENU_PUBLIC_TRADES:
      yield put(refreshPublicTrades())
      yield put(fetchPublicTrades())
      break
    case MENU_PUBLIC_FUNDING:
      yield put(refreshPublicFunding())
      yield put(fetchPublicFunding())
      break
    case MENU_TICKERS:
      yield put(refreshTickers())
      yield put(fetchTickers())
      break
    case MENU_DERIVATIVES:
      yield put(refreshDerivatives())
      yield put(fetchDerivatives())
      break
    default:
  }
}

function* setFiltersFromUrl() {
  const { pathname, search } = window.location

  let section = getTarget(pathname, false)
  // filters for movements are treated the same
  if (section === MENU_DEPOSITS || section === MENU_WITHDRAWALS) {
    section = MENU_MOVEMENTS
  }
  if (!section) {
    return
  }

  const filters = decodeFilters({ query: search, section })
  if (filters.length) {
    yield put(actions.setFilters({ section, filters, refresh: false })) // fetch will be done automatically after auth
  }
}

export default function* filtersSaga() {
  yield takeLatest(types.SET_FILTERS, setFilters)
  yield takeLatest(uiTypes.UI_LOADED, setFiltersFromUrl)
}
