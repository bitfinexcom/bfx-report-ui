import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, getSymbolsURL, getSymbolsFromUrlParam } from 'state/symbols/utils'
import { selectAuth } from 'state/auth/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit, getPageSize } from 'state/query/utils'
import { fetchNext } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getTargetSymbols, getFundingOfferHistory } from './selectors'

const TYPE = queryTypes.MENU_FOFFER
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

// make sure the first params is the `smallestMts` to be processed by fetchNext helper
function getReqFOffer(smallestMts, auth, query, targetSymbols) {
  const params = getTimeFrame(query, smallestMts)
  params.limit = LIMIT
  if (targetSymbols.length > 0) {
    params.symbol = formatRawSymbols(targetSymbols)
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
    const { result: resulto, error: erroro } = yield call(getReqFOffer, 0, auth, query, targetSymbols)
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqFOffer, 0, auth, query, targetSymbols)
    yield put(actions.updateFOffer(result, LIMIT, PAGE_SIZE))

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
    const { result: resulto, error: erroro } = yield call(getReqFOffer, smallestMts, auth, query, targetSymbols)
    const { result = {}, error } = yield call(
      fetchNext, resulto, erroro, getReqFOffer, smallestMts, auth, query, targetSymbols,
    )
    yield put(actions.updateFOffer(result, LIMIT, PAGE_SIZE))

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
