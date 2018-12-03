import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbolToFSymbol, getSymbolsURL, getSymbolsFromUrlParam } from 'state/symbols/utils'
import { selectAuth } from 'state/auth/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit } from 'state/query/utils'

import types from './constants'
import actions from './actions'
import { getTargetSymbols, getFundingOfferHistory } from './selectors'

const TYPE = queryTypes.MENU_FOFFER
const LIMIT = getQueryLimit(TYPE)

function getReqFOffer(auth, query, targetSymbols, smallestMts) {
  const params = getTimeFrame(query, TYPE, smallestMts)
  if (targetSymbols.length > 0) {
    params.symbol = formatRawSymbolToFSymbol(targetSymbols)
  }
  return makeFetchCall('getFundingOfferHistory', auth, params)
}

function* fetchFOffer({ payload: symbol }) {
  try {
    let targetSymbols = yield select(getTargetSymbols)
    const symbolsUrl = getSymbolsURL(targetSymbols)
    // set symbol from url
    if (symbol && symbol !== symbolsUrl) {
      targetSymbols = getSymbolsFromUrlParam(symbol)
      yield put(actions.setTargetSymbols(targetSymbols))
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqFOffer, auth, query, targetSymbols, 0)
    yield put(actions.updateFOffer(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'foffer.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'foffer.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchNextFOffer() {
  try {
    const {
      offset,
      entries,
      smallestMts,
      targetSymbols,
    } = yield select(getFundingOfferHistory)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqFOffer, auth, query, targetSymbols, smallestMts)
    yield put(actions.updateFOffer(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'foffer.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'foffer.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchFOfferFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* ordersSaga() {
  yield takeLatest(types.FETCH_FOFFER, fetchFOffer)
  yield takeLatest(types.FETCH_NEXT_FOFFER, fetchNextFOffer)
  yield takeLatest(types.FETCH_FAIL, fetchFOfferFail)
}
