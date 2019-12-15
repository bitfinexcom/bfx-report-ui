import {
  put,
  takeLatest,
} from 'redux-saga/effects'

import queryTypes from 'state/query/constants'
import { fetchLedgers } from 'state/ledgers/actions'
import { fetchTrades } from 'state/trades/actions'
import { fetchOrders } from 'state/orders/actions'
import { fetchPositions } from 'state/positions/actions'
import { fetchPAudit } from 'state/audit/actions'

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
  MENU_DERIVATIVES,
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
    case MENU_POSITIONS:
      return yield put(fetchPositions({ nextFetch: true }))
    case MENU_POSITIONS_AUDIT:
      return yield put(fetchPAudit({ nextFetch: true }))
    case MENU_FOFFER:
    case MENU_FLOAN:
    case MENU_FCREDIT:
    case MENU_FPAYMENT:
    case MENU_AFFILIATES_EARNINGS:
    case MENU_PUBLIC_TRADES:
    case MENU_PUBLIC_FUNDING:
    case MENU_TICKERS:
    case MENU_DERIVATIVES:
    default:
      return undefined
  }
}

export default function* filtersSaga() {
  yield takeLatest(types.FETCH_NEXT, fetchNext)
  yield takeLatest(types.FETCH_PREV, fetchNext)
}
