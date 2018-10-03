import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall, formatRawSymbolToFSymbol } from 'state/utils'
import { selectAuth } from 'state/auth/selectors'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'

import types from './constants'
import actions from './actions'
import { getTargetSymbol, getFundingOfferHistory } from './selectors'

function getReqFOffer(auth, query, targetSymbol, smallestMts) {
  const params = getTimeFrame(query, 'foffer', smallestMts)
  if (targetSymbol) {
    params.symbol = formatRawSymbolToFSymbol(targetSymbol)
  }
  return makeFetchCall('getFundingOfferHistory', auth, params)
}

function* fetchFOffer() {
  try {
    const targetSymbol = yield select(getTargetSymbol)
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqFOffer, auth, query, targetSymbol, 0)
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

const LIMIT = queryTypes.DEFAULT_FOFFER_QUERY_LIMIT

function* fetchNextFOffer() {
  try {
    const {
      offset,
      entries,
      smallestMts,
      targetSymbol,
    } = yield select(getFundingOfferHistory)
    // data exist, no need to fetch again
    if (entries.length - LIMIT >= offset) {
      return
    }
    const auth = yield select(selectAuth)
    const query = yield select(getQuery)
    const { result = [], error } = yield call(getReqFOffer, auth, query, targetSymbol, smallestMts)
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
