import {
  put,
  takeLatest,
} from 'redux-saga/effects'

import queryTypes from 'state/query/constants'
import { fetchLedgers } from 'state/ledgers/actions'
import { fetchTrades } from 'state/trades/actions'

import types from './constants'

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
} = queryTypes

function* fetchNext({ payload }) {
  const { section } = payload

  switch (section) {
    case MENU_LEDGERS:
      yield put(fetchLedgers({ nextFetch: true }))
      break
    case MENU_TRADES:
      yield put(fetchTrades({ nextFetch: true }))
      break
    case MENU_ORDERS:
    case MENU_MOVEMENTS:
    case MENU_POSITIONS:
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
  }
}

function* jumpPage({ payload }) {
  const { page, section } = payload
  console.log('jumpPage', section, page)
}

export default function* filtersSaga() {
  yield takeLatest(types.FETCH_NEXT, fetchNext)
  yield takeLatest(types.FETCH_PREV, fetchNext)
  yield takeLatest(types.JUMP_PAGE, jumpPage)
}
